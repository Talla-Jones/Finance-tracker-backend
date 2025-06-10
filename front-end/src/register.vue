<template>
  <div class="h-[70px] top-0 fixed flex justify-center items-center bg-myColor w-full font-bold text-3xl text-[#f0f0f0]">
    Finace Tracker
  </div>
  <div class="mt-[100px] p-4 flex justify-center items-center w-full">
    <div class="flex flex-col shadow-md w-[400px] justify-center px-5 py-3 items-left">
      <form @submit.prevent="handleRegister" class="w-full flex flex-col space-y-3">
        <h1 class="text-2xl font-bold px-1">Register</h1>
        <input v-model="form.name" placeholder="Name" class="border rounded-sm px-2 py-1" type="text">
        <input v-model="form.email" placeholder="Email" class="border rounded-sm px-2 py-1" type="email">
        <input v-model="form.password" placeholder="Password" class="border rounded-sm px-2 py-1" type="password">
        <input v-model="form.verifyPassword" placeholder="Re-enter Password" class="border rounded-sm px-2 py-1" type="password">
        <button class="bg-myColor text-textColor p-1 font-semibold rounded-sm hover:bg-brighter">Submit</button>
      </form>
      <div class="flex py-2 justify-end text-[14px]">
        Already have an acount? <a href="/login"><span class="text-brighter pl-1 cursor-pointer">Login</span></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name:'register',
    data(){
      return {
        form:{
          name:'',
          email:'',
          password:'',
          verifyPassword:''
        },
        err:''
      }      
    },
    methods: {
      async handleRegister() {
        console.log("User inputs:", this.form);

        // Fix: Compare form fields, not this.password
        if (this.form.password !== this.form.verifyPassword) {
          this.err = "Passwords don't match";
          return;
        }

        this.err = '';

        try {
          const response = await fetch('http://localhost:5000/api/auth/register', {
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
              name: this.form.name,
              email: this.form.email,
              password: this.form.password
            })
          });

          const data = await response.json();

          if (!response.ok) {
            this.err = data.message || "Registration failed";
            return;
          }
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
          // ✅ Successful registration
          this.$router.push('/dashboard');

        } catch (err) {
          console.error('Registration error:', err);
          this.err = "Something went wrong. Please try again.";
        }
      }
    }

    
  }
  
</script>