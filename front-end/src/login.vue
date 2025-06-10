<template>
  <div class="h-[70px] top-0 fixed flex justify-center items-center bg-myColor w-full font-bold text-3xl text-[#f0f0f0]">
    Finace Tracker
  </div>
  <div class="mt-[100px] p-4 flex justify-center items-center w-full">
    <div class="flex flex-col shadow-md w-[400px] justify-center px-5 py-3 items-left">
      <form @submit.prevent="handleLogin" class="w-full flex flex-col space-y-3">
        <h1 class="text-2xl font-bold px-1">Login</h1>
        <input v-model="form.email" placeholder="Email" class="border rounded-sm px-2 py-1" type="email">
        <input v-model="form.password" placeholder="Password" class="border rounded-sm px-2 py-1" type="password">
        <button class="bg-myColor text-textColor p-1 font-semibold rounded-sm hover:bg-brighter ">Submit</button>
      </form>
      <div class="flex py-2 justify-end text-[14px]">
        Don't have an account? <a href="/"><span class="text-brighter pl-1 cursor-pointer">Register</span></a>
      </div>
    </div>
  </div>
</template>

<script>

  export default{
    name: 'login',
    data(){
      return{
        form:{
          email:'',
          password:''
        }
      }
    },
    methods:{
      async handleLogin() {
        try {
          const response = await fetch('http://localhost:5000/api/auth/login', {
            headers: {
              'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(this.form)
          });

          const data = await response.json();
          
          if (!response.ok) {
            // Show login error
            alert(data.message || 'Login failed');
            return;
          }

          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.$router.push('/dashboard');

        } catch (err) {
          console.error('Login failed:', err);
          alert('Could not connect to server');
        }
      }

    }
  }
</script>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
