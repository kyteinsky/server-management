<template>
<div>
	<v-data-table
		:headers="headers"
		:items="items"
		class="elevation-1"
	>
		<template v-slot:item.controls="props">
			<v-btn @click="stopContainer(props.item)">
				<v-icon>mdi-stop-circle-outline</v-icon>
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
				const items = await $axios.$get(`/docker/containers`)
				items.forEach(container => {
					container.Id = container.Id.substring(0, 12)
					container.ImageID = container.ImageID.substring(7, 7+12)
					container.Created = new Date(container.Created).toLocaleString()
					container.IP = []
					container.NewPorts = []
					container.Ports.forEach(port => {
						container.IP.push(port.IP)
						container.NewPorts.push(`${port.PublicPort}:${port.PrivatePort}:${port.Type}`)
					})
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
				snackbar: false,
				timeout: 2000,
				text: 'yoohoo',
			}
		},

		methods: {
			stopContainer(item) {
				console.log(item.Id)
				this.snackbar = true
				this.text = item.Id
			},
		}
	}
</script>
