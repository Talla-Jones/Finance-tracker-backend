<template>
  <div class="flex justify-center items-center">
  <div class="flex justify-between bg-myColor fixed top-0 w-full h-[60px]">
    <div class="flex items-center justify-start px-4 text-xl font-semibold text-textColor">Finance Tracker</div>
    <div class="flex justify-between w-[400px] items-center pr-5">
      <router-link to="/dashboard">
        <div :class="{'font-normal': $route.path === '/dashboard'}" class="flex text-textColor font-light hover:font-normal cursor-pointer ">Dashboard</div>
      </router-link>
      <router-link to="/transactions">
        <div class="flex text-textColor font-light hover:font-normal cursor-pointer">Transactions</div>
      </router-link>      
      <router-link to="/summary">
        <div class="flex text-textColor font-light hover:font-normal cursor-pointer">Summary</div>
      </router-link>
      <div @click="ToggleBox" class="pl-5  flex justify-center items-center hover:cursor-pointer">
        <img class="pr-5" src="../public/hamburger-menu.png" alt="">
      </div>
      <div v-if="isVisible" class="absolute w-[230px] top-10 right-2 flex flex-col hover:cursor-pointer items-left justify-start text-xl px-8 py-4 bg-white shadow-2xl rounded-2xl">
        <a href="/Editprofile">
          <div class="mb-3 px-2 h-9 flex justify-left items-center w-full rounded-full hover:bg-textColor hover:justify-center">
           Edit Profile
          </div>
        </a>
        <hr class="mb-2 ">
        <a href="/transactions">
          <div class="mb-1 px-2 h-9 flex justify-left items-center w-full rounded-full hover:bg-textColor hover:justify-center">
            Transactions
          </div>
        </a>
        <a href="/summary">
          <div class="mb-1 px-2 h-9 flex justify-left items-center w-full rounded-full hover:bg-textColor hover:justify-center">
            Summary
          </div>
        </a>
        <hr>

        <div @click="logOut" class=" text-red-700 px-2 h-9 flex justify-left items-center w-full rounded-full hover:bg-textColor hover:justify-center">Logout</div>
      </div>
    </div>
  </div>
  <div class="flex mt-[80px] w-full justify-center items-center flex-col p-2 max-w-[750px] min-w-[600px]">
    <h1 class="text-4xl font-semibold mb-9">Welcome back, <span>{{ formatName(user.name) }}</span>!</h1>
    <div class="flex justify-between w-full px-4">
      <div class="flex flex-col justify-center items-center bg-[#fff1dd] h-[120px] w-[180px] rounded-lg shadow-md md:w-[200px]">
        <span class="font-bold text-xl text-[#009b2f] ">ξ</span>
        <span class="">Total Income</span>
        <span class="font-bold pt-1">
          {{ totals.totalIncome }} FCFA
        </span>
      </div>
      <div class="flex flex-col justify-center items-center bg-[#ffddef] h-[120px] w-[180px] rounded-lg shadow-md md:w-[200px]">
        <span class="font-bold text-red-700 text-xl">Ϝ</span>
        <span class="">Total Expenses</span>
        <span class="font-bold pt-1">
          {{ totals.totalExpense }} FCFA
        </span>
      </div>
      <div class="flex flex-col justify-center items-center bg-[#fff6f8] h-[120px] w-[180px] rounded-lg shadow-md md:w-[200px]">
        <span class="font-bold text-myColor text-xl">ζ</span>
        <span class="">Current Balance</span>
        <span class="font-bold pt-1">
          {{ totals.totalIncome-totals.totalExpense }} FCFA
        </span>
      </div>
    </div>
    <div class="flex px-4 justify-between items-center w-full mt-5 mb-5">
      <button
        class="bg-myColor text-textColor w-[180px] rounded-lg py-2 font-semibold hover:bg-brighter md:w-[200px]"
        @click="$router.push({ path: '/transactions', query: { type: 'income' } })"
      >
        + Income
      </button>
      <button
        class="bg-myColor text-textColor w-[180px] rounded-lg py-2 font-semibold hover:bg-brighter md:w-[200px]"
        @click="$router.push({ path: '/transactions', query: { type: 'expense' } })"
      >
        + Expenses
      </button>
    </div>

    <div class="flex w-full justify-start text-2xl font-semibold mb-2">Recent Transactions</div>
    <table class="border w-full">
      <th class="border text-left pl-3">Date</th>
      <th class="border text-left pl-3">Category</th>
      <th class="border text-left pl-3">Type</th>
      <th class="border text-left pl-3">Amount</th>
      <tbody>
        <tr v-for="t in transactions.slice(0, 4)" :key="t.id">
          <td class="border pl-2">{{ formatDate(t.date) }}</td>
          <td class="pl-2 border">{{ t.category }}</td>
          <td class="pl-2 border">{{ t.type }}</td>
          <td class="pl-2 border" :class="t.type === 'expense' ? 'text-red-700' : 'text-[green]'">
            {{ t.type === 'expense' ? '-' : '+' }}{{ t.amount }} FCFA
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-1 w-full flex justify-end pr-4 text-brighter cursor-pointer underline">
      <a href="/transactions">Go to transactions page</a>
    </div>
  </div>
  </div>
</template>

<script>
import transacsmixins from './mixins/transacsmixins';

  export default{
    name:'dash',
    data(){
      return{
        user:{
          name:''
        },
        isVisible:false
      }
    },
    mixins: [transacsmixins],
    beforeMount(){
      this.fetchTransactions();
      const user = localStorage.getItem('user');
      if (user){
        this.user = JSON.parse(user)
      }
    },
    methods:{
      formatName(name){
        return name.charAt(0).toUpperCase()+name.slice(1).toLowerCase();
      }
    }
  }
</script>