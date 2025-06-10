const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticate = require('../middleware/auth');
const authenticateToken = require('../middleware/auth');

// Add a new transaction
router.post('/', authenticate, (req, res) => {
  const { amount, type, category,description, date } = req.body;
  const userId = req.user.id;
  
  const query = `
    INSERT INTO transactions (user_id, amount, type, category,Description, date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [userId, amount, type, category, description, date], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json({ message: 'Transaction added successfully', id: result.insertId });
  });
});

// Get all transactions for the logged-in user
router.get('/getAll', authenticate, (req, res) => {
  const userId = req.user.id;

  const query = `SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC`;

  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json(results);
  });
});

router.get('/summary', authenticate, (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT 
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS totalIncome,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS totalExpense
    FROM transactions
    WHERE user_id = ? AND created_at >= NOW() - INTERVAL 30 DAY
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching summary:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    const summary = results[0] || { totalIncome: 0, totalExpense: 0 };
    res.json(summary);
  });
});

// Get transactions filtered by date or category
// router.get('/filter', authenticate, (req, res) => {
//   const userId = req.user.id;
//   const { start, end, category } = req.query;

//   let query = `SELECT * FROM transactions WHERE user_id = ?`;
//   let params = [userId];

//   if (start && end) {
//     query += ` AND date BETWEEN ? AND ?`;
//     params.push(start, end);
//   }

//   if (category) {
//     query += ` AND category = ?`;
//     params.push(category);
//   }

//   query += ` ORDER BY date DESC`;

//   db.query(query, params, (err, results) => {
//     if (err) return res.status(500).json({ message: 'Database error', error: err });
//     res.json(results);
//   });
// });

router.get('/search', (req, res) => {
  const { date, category } = req.query;
  let query = 'SELECT * FROM transactions WHERE 1=1';
  const params = [];

  if (date) {
    query += ' AND date = ?';
    params.push(date);
  }

  if (category) {
    query += ' AND category LIKE ?';
    params.push(`%${category}%`);
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json(results);
  });
});

router.delete('/:id', authenticateToken, (req, res)=>{
  const transactionId = req.params.id;
  const userId = req.user.id;

  db.query(
    'Delete from transactions where id = ? and user_id = ?',[transactionId, userId], (err, results)=>{
      if (err) return res.status(500).json({eror: err.message});
      if (results.affectedRows === 0){
        return res.status(404).json({message: 'Tranaction not found or you are not authorised'})
      }
      res.json({message: "Transaction deleted successfully"})
    }
  )
})

module.exports = router;
