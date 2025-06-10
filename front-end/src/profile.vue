<template>
  <div class="h-[70px] top-0 fixed flex justify-center items-center bg-myColor w-full font-bold text-3xl text-[#f0f0f0]">
    Finace Tracker
  </div>
  <div class="mt-[100px] p-4 flex justify-center items-center w-full">
    <div class="flex flex-col shadow-md w-[400px] justify-center px-5 py-3 items-left">
      <form @submit="editProfile" class="w-full flex flex-col space-y-3">
        <h1 class="text-2xl font-bold mb-2">Edit your profile information</h1>
        <div class="flex flex-col">
          <label for="">Name:</label>
          <input v-model="updateForm.name" class="border rounded-sm px-2 py-1" type="text">
        </div>
        <div class="flex flex-col">
          <label for="">Password:</label>
          <input v-model="updateForm.password" class="border rounded-sm px-2 py-1" type="password">
        </div>
        <button type="submit" class="bg-myColor text-textColor p-1 font-semibold rounded-sm hover:bg-brighter ">Edit</button>
      </form>
    </div>
  </div>

</template>
<script>
import transacsmixins from './mixins/transacsmixins';

export default{
  name: 'profile',
  mixins:[transacsmixins],
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.updateForm.name = user.name;
    }
  }
}

</script>