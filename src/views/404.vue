<template>
  <div>
    <v-container grid-list-xs>
      <v-row fill-height>
        <v-col cols="12">
          <v-card height="300" flat class="py-3">
            <v-img :src="require('@/assets/404.svg')" height="100%" width="100%" contain/>
          </v-card>
        </v-col>
        <v-col justify="center" class="text-center">
          <v-card flat>
            <v-card-text class="text-center">
              <h2 class="mb-3">Page Not Found</h2>
              <v-btn color="info" depressed to="/">Go Back</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
