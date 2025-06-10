<template>
  <div class="flex min-w-[550px]">
    <div class="flex justify-between bg-myColor fixed top-0 w-full h-[60px]">
      <div class="flex items-center justify-start px-4 text-xl font-semibold text-textColor">Finance Tracker</div>
      <div class="flex justify-between w-[400px] items-center pr-5">
        <router-link to="/dashboard">
          <div class="flex text-textColor font-light hover:font-normal cursor-pointer">Dashboard</div>
        </router-link>
        <router-link to="/transactions">
          <div :class="{'font-normal': $route.path === '/transactions'}" class="flex text-textColor font-light hover:font-normal cursor-pointer">Transactions</div>
        </router-link>      
        <router-link to="/summary">
          <div class="flex text-textColor font-light hover:font-normal cursor-pointer">Summary</div>
        </router-link>
        <div @click="ToggleBox" class="pl-5 rounded-md h-[30px] flex justify-center items-center">
          <img class="pr-5" src="../public/hamburger-menu.png" alt="">
        </div>
        <div v-if="isVisible" class="absolute w-[230px] top-10 right-2 flex flex-col hover:cursor-pointer items-left justify-start text-xl px-8 py-4 bg-white shadow-2xl rounded-2xl">
          <a href="/Editprofile">
            <div class="mb-3 px-2 h-9 flex justify-left items-center w-full rounded-full hover:bg-textColor hover:justify-center">
              Edit Profile
            </div>
          </a>
          <hr class="mb-2">
          <a href="/dashboard">
            <div class="mb-1 px-2 h-9 flex justify-left items-center w-full rounded-full hover:bg-textColor hover:justify-center">
              Dashboard
            </div>
          </a>
          <a href="/summary">
            <div class="mb-1 px-2 h-9 flex justify-left items-center w-full rounded-full hover:bg-textColor hover:justify-center">
              Summary
            </div>
          </a>
          <hr>
          <div @click="logOut" class="text-red-700 px-2 h-9 flex justify-left items-center w-full rounded-full hover:bg-textColor hover:justify-center">Logout</div>
        </div>
      </div>
    </div>

    <div class="flex flex-col mt-[60px] w-full">
      <div class="px-3 w-full">
        <h1 class="text-4xl font-semibold">Transactions</h1>
      </div>

      <div class="flex justify-between items-center w-full">
        <div class="flex w-full px-3 py-2 flex-col mt-3 space-y-2">
          <div class="text-xl font-semibold">+Add Transactions</div>
          <form @submit="handleTransactions" class="flex flex-col w-full space-y-2">
            <input v-model="form.Amount" placeholder="Amount" class="border px-3 py-1 rounded-sm" type="text">
            <select v-model="form.Type" class="border px-3 py-1 rounded-sm">
              <option disabled value="">Select type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input v-model="form.Category" placeholder="Category" class="border px-3 py-1 rounded-sm" type="text">
            <input v-model="form.date" placeholder="YYYY-MM-DD" class="border px-3 py-1 rounded-sm" type="text" pattern="\d{4}-\d{2}-\d{2}">
            <button class="rounded-sm bg-myColor text-textColor py-1" @click="getAllUserTransactions">Submit</button>
          </form>
        </div>

        <div class="flex h-[200px] w-[60%] mr-4 flex-col">
          <div class="text-xl font-semibold mb-1 mt-[-6px]">+Add Description</div>
          <textarea v-model="form.Description" class="h-full w-full px-2 py-1 border flex rounded-sm shadow-sm"></textarea>
        </div>
      </div>

      <div class="flex px-3 flex-row w-full">
        <div class="flex flex-col w-[75%]">
          <section class="mt-5 mb-4 flex justify-between">
            <input class="w-[35%] border px-2 py-1 rounded-sm" placeholder="YYYY-MM-DD" type="text" v-model="date" pattern="\d{4}-\d{2}-\d{2}">
            <input placeholder="Search by category" class="border px-2 py-1 w-[35%] rounded-sm" type="text" v-model="category">
            <button class="bg-myColor px-4 py-1 text-textColor rounded-sm hover:bg-brighter" @click="handleClick">Search</button>
          </section>

          <table class="border">
            <thead class="w-full">
              <tr>
                <th class="border">Date</th>
                <th class="border">Description</th>
                <th class="border">Category</th>
                <th class="border">Type</th>
                <th class="border">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="transactions.length === 0">
                <td class="text-center" colspan="5">You haven't performed any transactions yet</td>
              </tr>
              <tr v-for="t in transactions" :key="t.id" @contextmenu.prevent="openContextMenu($event, t.id)">
                <td class="border pl-2">{{ formatDate(t.date) }}</td>
                <td class="border pl-2">{{ t.Description }}</td>
                <td class="pl-2 border">{{ t.category }}</td>
                <td class="pl-2 border">{{ t.type }}</td>
                <td class="pl-2 border" :class="t.type === 'expense' ? 'text-red-700' : 'text-[green]'">
                  {{ t.type === 'expense' ? '-' : '+' }}{{ t.amount }} FCFA
                </td>
              </tr>
            </tbody>
          </table>

          <!-- ✅ Custom Right-Click Context Menu -->
          <div
            v-if="contextMenu.visible"
            :style="{ top: contextMenu.y + 'px', left: contextMenu.x + 'px', position: 'fixed' }"
            class="absolute bg-white shadow-lg rounded-md z-50 px-4 py-2 text-sm cursor-pointer hover:bg-red-100"
            @click="deleteTransaction(contextMenu.transactionId)"
          >
            🗑️ Delete
          </div>
        </div>

        <div v-if="transactions.length > 0" class="flex flex-col justify-start ml-4 pt-5 items-center w-[25%]">
          <div class="flex flex-col shadow-md rounded-sm px-2 py-3 w-[90%]">
            <h1 class="font-semibold py-2">Quick stats</h1>
            <div class="mt-2">
              Income this month
              <span class="text-[green] font-semibold block">{{ parsedSpecifics.totalIncome }} FCFA</span>
            </div>
            <div class="mt-2">
              Expenses this month
              <span class="text-red-700 font-semibold block">{{ parsedSpecifics.totalExpense }} FCFA</span>
            </div>
            <div class="mt-2">
              Net Balance
              <span id="newBalance" class="text-[green] font-semibold block">{{ totals.totalIncome - totals.totalExpense }} FCFA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import transacsmixins from './mixins/transacsmixins';

export default {
  name: 'transactions',
  mixins: [transacsmixins],
  data() {
    return {
      form: {
        Amount: '',
        Type: '',
        Category: '',
        date: '',
        Description: ''
      },
      date: '',
      category: '',
      isVisible: false,
      contextMenu:{
        visible: false,
        x: 100,
        y: 100,
        transactionId: null
      },
      parsedSpecifics:{
        totalIncome:'',
        totalExpense:''
      }
    }
  },
  methods: {
    handleClick() {
      localStorage.setItem('searchDate', this.date);
      localStorage.setItem('searchCategory', this.category);
      this.$router.push('/results');
    },
    prefillTypeFromRoute() {
      const prefillType = this.$route.query.type;
      if (prefillType === 'income' || prefillType === 'expense') {
        this.form.Type = prefillType;
      }
    },
    openContextMenu(event, id) {
      this.contextMenu.visible = true;
      this.contextMenu.x = event.clientX;
      this.contextMenu.y = event.clientY;
      this.contextMenu.transactionId = id;

      // Close on outside click
      document.addEventListener('click', this.closeContextMenu);
    },
    closeContextMenu() {
      this.contextMenu.visible = false;
      document.removeEventListener('click', this.closeContextMenu);
    },
    deleteTransaction(id) {
      const token = localStorage.getItem('token');
      fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          this.fetchTransactions();
          this.closeContextMenu();
        })
        .catch(err => console.error('Deletion failed:', err));
    }


  },
  mounted() {
    this.prefillTypeFromRoute();
    this.fetchTransactions().then(() => {
      this.getTotals();
    });
    const specificTotals = localStorage.getItem('specificTotals');
    console.log(specificTotals);
    this.parsedSpecifics = JSON.parse(specificTotals);
  },
  watch: {
    '$route.query.type': function () {
      this.prefillTypeFromRoute(); // reapply if query changes
    }
  }
};
</script>
