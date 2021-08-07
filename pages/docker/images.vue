<template>
	<div>
		<v-data-table
			:headers="headers"
			:items="items"
			class="elevation-1"
		>
			<template v-slot:item.controls="props">
				<v-btn @click="doImage(props.item, 'delete')">
				<!--<v-progress-circular
						v-if="loading[props.item.Id]"
						indeterminate
						color="red"
					></v-progress-circular>
					<v-icon v-else>mdi-delete</v-icon>-->
					<v-icon>mdi-delete</v-icon>
				</v-btn>
				<v-btn @click="doImage(props.item, 'create')">
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
	const axios = require('axios')
	async function getImageList() {
		try {
			// axios.setToken(localStorage.access_token);
			const res = await axios.get(`/api/docker/images`, {
				headers:
					{
						'authorization': localStorage.access_token
					}
			})
			const items = res?.data
			items.forEach(image => {
					if (image.Containers == -1)
						image.Containers = 'None'
					image.Id = image.Id.substring(7, 7+12)
					image.Created = new Date(image.Created).toLocaleString()
					image.Size = parseInt(image.Size / 1000 / 1000) + ' mb'
				});
			return items
		} catch (e) {
			console.log(e);
		}
	}

	export default {
		async asyncData() {
			return { items: await getImageList() }
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

		mounted() {
			window.setInterval(() => {
				getImageList()
					.then(items => this.items = items)
					.catch(e => console.error(e))
			}, 5000)
		},

		methods: {
			doImage(item) {
				this.snackbar = true
				this.text = 'Sending request to server'
				this.$axios.$post(
					'/docker/images/delete',
					{ ImageId: item.Id }
				)
				.then(res => this.text = res || `${action} job successful for Image ${item.Id}`)
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
