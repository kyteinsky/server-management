<template>
	<div>
		<v-alert
			v-if="error"
      text
      prominent
      type="error"
      icon="mdi-cloud-alert"
    >
      {{ error }}
    </v-alert>
		<v-data-table
			:headers="headers"
			:items="values"
			class="elevation-1"
		></v-data-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				error: '',
				headers: [ { text: 'Table Names', value:'TableName' } ]
			}
		},
		async asyncData({ $axios }) {
			try {
				const res = await $axios.$get('/database/tables')
				console.log(res);
				let values = []
				for (let k in res) {
					values.push({ TableName: res[k] })
				}
				return { values, error: '' }
			} catch (e) {
				console.error(e);
				return { error: e }
			}
		},
	}
</script>
val