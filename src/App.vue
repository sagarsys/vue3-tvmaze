<script setup lang="ts">
</script>

<template>
  <div>
    <header>
      <nav>
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/show/1">Show details</RouterLink>
        <RouterLink to="/search">Search</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  align-items: center;
}

nav a {
  margin: 0 10px;
}
</style>


