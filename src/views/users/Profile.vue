<template>
  <div>
    <v-card outlined>
      <v-card-text>
        <h2>Личный кабинет</h2>
      </v-card-text>
    </v-card>
    <div class="row flex-nowrap">
      <div class="col page-navigation">
        <v-card outlined class="mb-4">
          <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
        </v-card>
        <v-card outlined class="mb-4">
          <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
        </v-card>
        <v-card outlined class="mb-4">
          <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
        </v-card>
      </div>
      <div class="col page-content">
        <!-- Main fields (name, email) -->
        <v-card outlined class="mb-4">
          <v-list class="list-flex">
            <!-- user image -->
            <v-list-item @click="() => ({})" class="py-4">
              <div class="body-1 grey--text text--darken-1">Аватар</div>
              <div>
                <v-avatar>
                  <v-img :src="user.data.image"></v-img>
                </v-avatar>
              </div>
            </v-list-item>
            <!-- <v-divider class="mb-2" /> -->

            <!-- other fields -->
            <template v-for="(field) in profileFields">
              <v-list-item :key="field.name" @click="() => ({})">
                <div class="body-1 grey--text text--darken-1">{{field.name}}</div>
                <div>{{field.data}}</div>
              </v-list-item>
            </template>
          </v-list>
        </v-card>

        <!-- Role fields (student, teacher) -->

        <v-card outlined>
          <v-list class="list-flex">
            <template v-for="(field) in profileRoleFields">
              <v-list-item :key="field.name" @click="() => ({})">
                <div class="body-1 grey--text text--darken-1">{{field.name}}</div>
                <div>{{field.data}}</div>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </div>

      <div class="col page-info">
        <v-card outlined class="mb-4">
          <v-skeleton-loader type="card-avatar"></v-skeleton-loader>
        </v-card>
        <v-card outlined class="mb-4">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-card>
        <v-card outlined class="mb-4">
          <v-skeleton-loader type="card-heading"></v-skeleton-loader>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    user() {
      return this.$store.state.user;
    },
    profileFields() {
      return [
        {
          name: "Имя",
          data: this.user.data.name
        },
        {
          name: "Фамилия",
          data: this.user.data.surname
        },
        {
          name: "Email",
          data: this.user.data.email
        }
      ];
    },
    profileRoleFields() {
      if (this.user.data.role === 1) {
        return [
          {
            name: "Роль",
            data: this.dictionary.user_role(this.user.data.role)
          },
          {
            name: "Направление",
            data: this.user.data.student.specialty.name
          },
          {
            name: "Курс",
            data: this.user.data.student.year
          },
          {
            name: "Академическая группа",
            data: this.user.data.student.group.name
          }
        ];
      } else if (this.user.data.role === 2) {
        return [
          {
            name: "Роль",
            data: this.dictionary.user_role(this.user.data.role)
          }
        ];
      } else {
        return [];
      }
    }
  }
};
</script>