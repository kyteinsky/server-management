<template>
  <v-app dark>


    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
				<v-list-group
					v-for="(group, i) in groups"
					:value="group.open"
					:prepend-icon="group.icon"
					:key="i"
				>
					<template v-slot:activator>
						<v-list-item-content>
							<v-list-item-title>{{ group.title }}</v-list-item-title>
						</v-list-item-content>
					</template>

					<v-list-item
						v-for="(item, i) in group.items"
						:key="i"
						:to="item.to"
						nuxt-link
					>
						<v-list-item-content>
							<v-list-item-title v-text="item.title" />
						</v-list-item-content>
					</v-list-item>
        </v-list-group>


      </v-list>
    </v-navigation-drawer>


    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>AltSeasons</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      miniVariant: false,
      title: 'AltSeasons',
      groups: [
        {
          icon: 'mdi-docker',
          title: 'Docker',
					open: true,
					items: [
						{
							title: 'Images',
							to: '/docker/images'
						},
						{
							title: 'Containers',
							to: '/docker/containers'
						},
						{
							title: 'Services',
							to: '/docker/services'
						},
					],
        },
        {
					icon: 'mdi-database',
					title: 'Database',
					open: false,
					items: [
						{
							title: 'Databases',
							to: '/database/databases'
						},
						{
							title: 'Tables',
							to: '/database/tables'
						},
						{
							title: 'Views',
							to: '/database/views'
						},
					],
				},
      ],
    }
  }
}
</script>
