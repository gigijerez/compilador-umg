<template>
    <header>

        <v-flex>
            <v-toolbar app fixed clipped-left color="#045278" dark>
                <a href="/" class="d-flex router-link-active">
                    <img src="@/assets/logo.png" style="width:50px; height:50px; margin: 4px 10px;">
                </a>
                <v-toolbar-title>Grethel Caal</v-toolbar-title>
                <v-spacer>
                </v-spacer>
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-toolbar>
        </v-flex>
    </header>
</template>
<script>
    export default {
        data() {
            return {
                drawer: false
            }
        },
        methods: {

        }

    }
</script>

<style>

</style>