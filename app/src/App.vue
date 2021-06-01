<template>
  <v-app>
    <theme-header>    
    </theme-header>    
    <v-main>
      <v-container >
        <v-compiler>
          
        </v-compiler>
      </v-container>  
    </v-main>
    <theme-footer>    
    </theme-footer> 
  </v-app>
</template>

<script>
import themeHeader from './components/theme/themeHeader'
import themeFooter from './components/theme/themeFooter'
import compiler from './components/compiler'
export default {
  name: 'App',
  components:{
    themeHeader,
    themeFooter,
    compiler
  },
  data: () => ({
    //
  }),
};
</script>
