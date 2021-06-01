<template>
  <v-content>
      <v-form>
          <v-container>
              <v-layout row wrap justify-center>
                <v-flex md8 sm12>
                  <v-layout wrap>
                    <v-flex md6 sm12>
  
                      <v-text-field box label="Archivo .txt" @click="pickFile()" v-model="txtName" prepend-icon='fa-file-upload'></v-text-field>
                      <input type="file" style="display: none" ref="fileInput" @change="processFile($event)">
                    </v-flex>
                    <v-flex md6 sm12>
                      <v-btn px-0 large color="success" @click="runFile()">Run</v-btn>
                      <v-btn px-0 large color="info" @click="cleanFile()">Clean</v-btn>
                    </v-flex>
                  </v-layout>
                  <v-textarea box prepend-icon='fa-file-signature' name="input-2-1" :label="txtName" :value="txtDataAfn" hint='Representacion de la quintupla AFN.' style="margin-right:1rem;"></v-textarea>
                </v-flex>
            </v-layout>
        </v-container>
      </v-form>
  </v-content>
</template>

<script>
export default {

}
</script>

<style>

</style>