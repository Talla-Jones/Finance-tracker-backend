<template>
  <div>
    
    <div class="flex justify-between bg-myColor fixed top-0 w-full h-[60px]">
      <div class="flex items-center justify-start px-4 text-xl font-semibold text-textColor">Finance Tracker</div>
      <div class="flex justify-between w-[400px] items-center pr-5">
        <router-link to="/dashboard">
          <div class="flex text-textColor font-light hover:font-normal cursor-pointer">Dashboard</div>
        </router-link>
        <router-link to="/transactions">
          <div class="flex text-textColor font-light hover:font-normal cursor-pointer">Transactions</div>
        </router-link>      
        <router-link to="/summary">
          <div class="flex text-textColor font-light hover:font-normal cursor-pointer" :class="{'font-normal': $route.path === '/summary'}" >Summary</div>
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
          <hr class="mb-2 ">
          <a href="/dashboard">
            <div class="mb-1 px-2 h-9 flex justify-left items-center w-full rounded-full hover:bg-textColor hover:justify-center">
              Dashboard
            </div>
          </a>
          <a href="/transactions">
            <div class="mb-1 px-2 h-9 flex justify-left items-center w-full rounded-full hover:bg-textColor hover:justify-center">
              Transactions
            </div>
          </a>
          <hr>

          <div @click="logOut" class=" text-red-700 px-2 h-9 flex justify-left items-center w-full rounded-full hover:bg-textColor hover:justify-center">Logout</div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center mt-[60px] w-full">
      <div class="flex px-3 flex-col max-w-[800px]">
        <div class="flex w-full mb-3">
          <h1 class="text-3xl font-semibold">Your transactions summary for this month</h1>
        </div>
        <div class="flex justify-between flex-row w-full mb-4 pr-[39%]">
          <div class="flex flex-col space-y-2 w-[48%]">
            <label class="font-semibold">Start Date</label>
            <div class="border rounded-sm px-2 py-1">{{ startDate }}</div>
          </div>
          <div class="flex flex-col space-y-2 w-[48%]">
            <label class="font-semibold">End Date</label>
            <div class="border rounded-sm px-2 py-1">{{ endDate }}</div>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex flex-col border items-center p-2 w-[31%]">
            <div>Total Income</div>
            <div class="text-xl font-semibold text-green-700">{{ specificTotals.totalIncome }} FCFA</div>
          </div>
          <div class="flex flex-col border items-center p-2 w-[31%]">
            <div>Total Expenses</div>
            <div class="text-xl font-semibold text-red-700">{{ specificTotals.totalExpense }} FCFA</div>
          </div>
          <div class="flex flex-col border items-center p-2 w-[31%]">
            <div>Net Balance</div>
            <div class="text-xl font-semibold">
              {{ specificTotals.totalIncome-specificTotals.totalExpense }} FCFA
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import transacsmixins from './mixins/transacsmixins';
export default {
  data(){
    return{
      isVisible:false,
      startDate: dayjs().subtract(30, 'day').format('MMMM D, YYYY'),
      endDate: dayjs().format('MMMM D, YYYY'),
      specificTotals:{
        totalIncome: 0,
        totalExpense: 0
      }
    }
  },
  name: 'Summary',
  mixins: [transacsmixins],
  mounted() {
    this.fetchSpecificTransactions();
  },
  methods:{
    async fetchSpecificTransactions() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/transactions/summary', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        this.specificTotals = data;
        localStorage.setItem('specificTotals', JSON.stringify(data));
        
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    }
  }
};
</script>
