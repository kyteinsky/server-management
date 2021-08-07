<template>
<div>
	<v-data-table
		:headers="headers"
		:items="items"
		class="elevation-1"
	>
		<template v-slot:item.controls="props">
			<div class="d-flex flex-row">
				<v-btn @click="doContainer(props.item, 'stop')">
					<v-icon>mdi-stop-circle-outline</v-icon>
				</v-btn>
				<v-btn @click="doContainer(props.item, 'delete')">
					<v-icon>mdi-delete-outline</v-icon>
				</v-btn>
				<v-btn @click="doContainer(props.item, 'start')">
					<v-icon>mdi-play-circle-outline</v-icon>
				</v-btn>
			</div>
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
	async function getContainerList() {
		try {
			// axios.setToken(localStorage.access_token);
			const res = await axios.get(`/api/docker/containers`, {
				headers:
					{
						'authorization': localStorage.access_token
					}
			})
			const items = res?.data
			items.forEach(container => {
				container.Id = container.Id.substring(0, 12)
				if (container.Image === container.ImageID)
					container.Image = container.Image.substring(7, 7+12)
				container.ImageID = container.ImageID.substring(7, 7+12)
				container.Created = new Date(container.Created).toLocaleString()
				container.IP = []
				container.NewPorts = []
				container.Ports.forEach(port => {
					container.IP.push(port.IP)
					container.NewPorts.push(`${port.PublicPort}:${port.PrivatePort}:${port.Type}`)
				})
			});
			return items
		} catch (e) {
			console.log(e);
		}
	}

	export default {
		async asyncData() {
			return { items: await getContainerList() }
		},

		data() {
			return { // do a computed property or axios default to generate headers and values
				headers: [
          { text: 'Container ID', value: 'Id' }, //
          { text: 'Names', value: 'Names' },
          { text: 'Image', value: 'Image' },
          { text: 'Image ID', value: 'ImageID' }, //
          { text: 'Command', value: 'Command' },
          { text: 'Created', value: 'Created' }, //
          { text: 'IP', value: 'IP' }, //
          { text: 'Ports (pub:pri:type)', value: 'NewPorts' }, //
          { text: 'State', value: 'State' },
          { text: 'Status', value: 'Status' },
          { text: 'Mounts', value: 'Mounts' },
					{ text: "Stop", value: "controls", sortable: false }
        ],
				items: [],
				snackbar: false,
				timeout: 2000,
				text: 'yoohoo',
			}
		},

		mounted() {
			window.setInterval(() => {
				getContainerList()
					.then(items => this.items = items)
					.catch(e => console.error(e))
			}, 5000)
		},

		methods: {
			doContainer(item, action) {
				this.snackbar = true
				this.text = `Sending ${action} request to server...`
				this.$axios.$post(
					'/docker/containers/' + action,
					{ id: item.Id }
				)
				.then(res => this.text = res || `${action} job successful for Container ${item.Id}`)
				.catch(e => this.text = e)
				
				if (this.snackbar)
					this.snackbar = false
				this.snackbar = true
			},
		}
	}
</script>
