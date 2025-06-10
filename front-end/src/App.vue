<template>
  <div>
    <nav>
      <router-link to="/register">Register</router-link> |
      <router-link to="/">Login</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/transactions">Transactions</router-link> |
      <router-link to="/summary">Summary</router-link> |
      <router-link to="/results">Search Results</router-link> |
      <router-link to="/Editprofile">Edit</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
