<template>
	<div>
		<v-data-table
			:headers="headers"
			:items="items"
			class="elevation-1"
		>
			<template v-slot:item.controls="props">
			<h5>{{ props.loading  }}</h5>
				<v-btn @click="deleteImage(props.item)">
				<!--<v-progress-circular
						v-if="loading[props.item.Id]"
						indeterminate
						color="red"
					></v-progress-circular>
					<v-icon v-else>mdi-delete</v-icon>-->
					<v-icon>mdi-delete</v-icon>
				</v-btn>
				<v-btn @click="makeContainer(props.item)">
					<!--<v-progress-circular
						v-if="props.item.loading"
						indeterminate
						color="green"
					></v-progress-circular>
					<v-icon v-else>mdi-plus</v-icon>-->
					<v-icon>mdi-plus</v-icon>
				</v-btn>
			</template>
		</v-data-table>

		<v-snackbar
			v-model="snackbar"
			:timeout="timeout"
		>
			{{ text }}

			<template v-slot:action="{ attrs }">
				<v-btn
					color="blue"
					text
					v-bind="attrs"
					@click="snackbar = false"
				>
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
	// const timeago = require('timeago.js')
	export default {
		async asyncData({ $axios }) {
			try {
				const items = await $axios.$get(`/docker/images`)
				items.forEach(image => {
					if (image.Containers == -1)
						image.Containers = 'None'
					image.Id = image.Id.substring(7, 7+12)
					image.Created = new Date(image.Created).toLocaleString()
					image.Size = parseInt(image.Size / 1000 / 1000) + ' mb'
				});
				return { items }
			} catch (e) {
				console.log(e);
				return { items: [] }
			}
		},

		data() {
			return { // do a computed property or axios default to generate headers and values
				headers: [
          { text: 'Containers', value: 'Containers' },
          { text: 'Created', value: 'Created' },
          { text: 'Image Id', value: 'Id' },
          { text: 'Repo Tags', value: 'RepoTags' },
          { text: 'Size', value: 'Size' },
					{ text: "Actions", value: "controls", sortable: false }
        ],
				snackbar: false,
				timeout: 5000,
				text: 'yoohoo',
			}
		},

		methods: {
			deleteImage(item) {
				this.snackbar = true
				this.text = 'Sending request to server'
				this.$axios.$post(
					'/docker/images/delete',
					{ ImageId: item.Id }
				)
				.then(res => this.text = res)
				.catch(e => this.text = e.message)

				// remove it from view
				this.items = this.items.filter(e => e.Id != item.Id)
				
				if (this.snackbar)
					this.snackbar = false
				this.snackbar = true
			},
			makeContainer(item) {
				console.log(item.Id);
				this.text = 'This button is under construction'
				this.snackbar = true;
			}
		}
	}
</script>
