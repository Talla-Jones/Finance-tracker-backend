<template>
  <div class="h-[70px] top-0 fixed flex justify-center items-center bg-[#f0f0f0] w-full font-bold text-3xl text-myColor shadow-md">
    Finace Tracker
  </div>
  <div class="flex flex-col w-full h-[70vh] mt-[70px] px-5 items-center">
    <div class="border w-full rounded-lg justify-center flex items-center py-2 px-5 mb-3" v-if=" searchResults.length === 0">
      No transactions found for this Date
    </div>
    <div
    v-for="transaction in searchResults"
    
    class="border w-full rounded-lg justify-start items-center py-2 px-5 mb-3">
      <p>
        You made a transaction of type <strong :class="transaction.type === 'expense'? 'text-brighter':'text-[green]'">{{ transaction.type }}</strong> with an amount <span class=" font-semibold" :class="transaction.type === 'expense'? 'text-brighter':'text-[green]'">{{ transaction.amount }} FCFA</span> on the <span class="font-semibold">{{ formatDate(transaction.date) }} </span>
        .
        <span>
          You
          <span v-if="transaction.type === 'expense'">spent the money on {{ transaction.category }}</span>
          <span v-else>recieved the money from {{ transaction.category }}</span>
        </span>
      </p>
      <p v-if="transaction.Description.length === 0 ">
        You gave no description
      </p>
      <p >
        Here's the description you gave:
        <p>{{ transaction.Description }}</p>
      </p>
    </div>
  </div>
</template>

<script>
import transacsmixins from './mixins/transacsmixins';

export default {
  mixins:[transacsmixins],
  name: 'results',
  data(){
    return{
      results:[]
    }
  },

  mounted() {
    this.date = localStorage.getItem('searchDate') || '';
    this.category = localStorage.getItem('searchCategory') || '';
    
    // Clear after use
    localStorage.removeItem('searchDate');
    localStorage.removeItem('searchCategory');('searchCategory');
    if (this.date || this.category) {
      this.searchResults = this.searchTransactions(this.date, this.category); 
    }
  }
}
</script>