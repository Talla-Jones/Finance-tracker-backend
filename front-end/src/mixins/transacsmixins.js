export default{
  data(){
    return{
      form:{
        Amount:'',
        Type:'',
        Category:'',
        Description:'',
        date:''
      },
      transactions: [],
      searchResults: [],
      totals:{
        totalIncome: 0,
        totalExpense: 0
      },
      date:'',
      category:'',
      updateForm: {
        name:'',
        password: ''
      }
    }
  },
  methods: {
    fetchTransactions() {
      const token = localStorage.getItem('token');
      return fetch('http://localhost:5000/api/transactions/getAll', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        // Sort by date descending (most recent first)
        this.transactions = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        this.getTotals();
      })
      .catch(err => {
        console.error('Failed to fetch transactions:', err);
      });
    },

    handleTransactions() {
      const token = localStorage.getItem('token');

      const payload = {
        amount: parseFloat(this.form.Amount),
        type: this.form.Type,
        category: this.form.Category,
        description: this.form.Description,
        date: this.form.date
      };

      fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
      .then(async res => {
        const data = await res.json();
        console.log("Transaction submitted:", data);
        this.fetchTransactions(); // ✅ Refresh table after adding
      })
      .catch(err => {
        console.error('Transaction failed:', err);
      });
    },
    editProfile() {
      console.log('Submitting...');

      const token = localStorage.getItem('token');
      const updates = {
        name: this.updateForm.name,
        password: this.updateForm.password
      };

      fetch('http://localhost:5000/api/auth/Edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      })
        .then(async res => {
          const data = await res.json();
          console.log('Profile Updated:', data);

          // ✅ Update localStorage user
          const user = JSON.parse(localStorage.getItem('user'));
          user.name = updates.name;
          localStorage.setItem('user', JSON.stringify(user));

          // ✅ Redirect to dashboard
          this.$router.push('/dashboard');
        })
        .catch(err => {
          console.error('Update failed:', err);
        });
    },

    formatDate(dateStr){
      const date = new Date(dateStr);
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const yyyy = date.getFullYear();
      return `${dd}/${mm}/${yyyy}`
    },
    getTotals() {
      let totals = {
        totalIncome : 0,
        totalExpense : 0
      }
      this.transactions.forEach(transaction => {
        if(transaction.type === 'income'){
          totals.totalIncome += parseFloat(transaction.amount)
        }else{
          totals.totalExpense += parseFloat(transaction.amount)
        }
      });

        this.totals = totals;
      if(totals.totalIncome-totals.totalExpense<0){
        document.getElementById('newBalance').style.color = '#c90046'
      }
    },
    async searchTransactions() {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams();

      if (this.date) queryParams.append('date', this.date);
      if (this.category) queryParams.append('category', this.category);

      try {
        const res = await fetch(`http://localhost:5000/api/transactions/search?${queryParams}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        this.searchResults = data; // ✅ This must be an array
      } catch (err) {
        console.error('Search failed:', err);
        this.searchResults = [];
      }
   },
   logOut(){
    localStorage.clear();
    this.$router.push('/');
   },
    ToggleBox(){
      this.isVisible=!this.isVisible;
      return this.isVisible;
    },
  },
}