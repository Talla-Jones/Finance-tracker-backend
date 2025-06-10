<template>

  <main class="p-5">
    <h1 class="text-center text-[30px] text-blue-500">Hello World</h1>

    <div class="w-full h-10 bg-violet-200 border border-violet-600 rounded-md my-4 p-2">
      <p class="text-center font-mono font-extrabold">
        A div
      </p>
    </div>
    <div class="w-10 h-10 bg-red-700 fixed top-0"></div>
    <div class="flex justify-between p-5 space-x-5">
      <div class="flex w-10 h-10 bg-blue-500 rounded-full"></div>
      <div class="flex w-10 h-10 bg-blue-500 rounded-full"></div>
      <div class="flex w-10 h-10 bg-blue-500 rounded-full"></div>
      <div class="flex w-10 h-10 bg-blue-500 rounded-full"></div>
    </div>
    <!-- mediaQueries -->
    <div class="md:block hidden">
      <p>i wil appear for device resolution >768px</p>
    </div>
    <div class="max-md:block hidden">
      <p>i wil appear for device resolution <768px</p>
    </div>
    <!-- Pseudo Classes -->
    <button class="my-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-800 cursor-pointer focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-900 ">
      Click Me
    </button>
    <ul class=" space-y-2">
      <li class=" bg-white first:bg-yellow-200 px-2">item 1</li>
      <li class=" bg-white first:bg-yellow-200 px-2 odd:bg-blue-400 even:bg-green-400">item 2</li>
      <li class=" bg-white first:bg-yellow-200 px-2 odd:bg-blue-400 even:bg-green-400">item 3</li>
      <li class=" bg-white first:bg-yellow-200 px-2 odd:bg-blue-400 even:bg-green-400">item 4</li>
    </ul>
    <!-- Dark Mode and Light Mode -->
    <div class=" m-10 bg-white shadow-xl py-6 px-8 ring-1 rounded-[14px] ring-slate-900/5 dark:bg-black">
      <h3 class=" text-base font-medium text-slate-900 dark:text-white">This is a text element</h3>
      <p class=" mt-2 text-sm text-slate-500 dark:text-slate-100">This is an even longer p tag element</p>
      
      <button id="toggleDark" class="text-blue-800 bg-blue-100 py-1 px-4 mt-4 rounded-md" onclick="document.body.classList.toggle('dark')">
        Toggle Dark Mode
      </button>
    </div>

    <p class="text-2xl text-[#1182de] bg-stone-200 px-2 py-1">ChestNuts Color</p>
  </main>

</template>

<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', () => {
    const toggleDark = document.getElementById('toggleDark');
    toggleDark.addEventListener('click', () => {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
      // alert('click!');
    });
  });
</script>

<script setup>
// No script needed for this demo
</script>
