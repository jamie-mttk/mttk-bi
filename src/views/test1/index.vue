<template>
	<div style="margin: 20px;max-width: 520px;">
		{{ formLabelAlign }}
		<el-form label-position="top" label-width="100px" :model="formLabelAlign" style="">
			<el-form-item>
				<template #label>
					Name

					<lc-icon icon="mdiHelpCircleOutline" tooltip="THIS IS HAHA"></lc-icon>
					
				</template>
				<el-input v-model="formLabelAlign.name" />
			</el-form-item>
			<el-form-item label="Activity zone">
				<el-input v-model="formLabelAlign.region" />
			</el-form-item>
			<el-form-item label="Activity form">
				<el-input v-model="formLabelAlign.type" />
			</el-form-item>
		</el-form>

		<CompWrap :config="formConfig"></CompWrap>


		<el-tooltip class="box-item" effect="dark" :disabled="false" content="Top Center prompts info" placement="top">
			<el-button @click="testClicked">top</el-button>
		</el-tooltip>
		
	</div>
</template>
  
<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
function testClicked() {
	const a={a:'1',b:[11,22,33]}
	console.log(JSON.stringify(a))
	const b={a:'9',b:[]}
	console.log(JSON.stringify(b))
	b.b=a.b
	const c=reactive(b.b)
	c.push(88)
	
	console.log(JSON.stringify(a))
	console.log(JSON.stringify(b))
}


const formLabelAlign = reactive({
	name: '',
	region: '',
	type: '',
})

const formConfig = reactive({
	sys: {
		//
		component: "ElForm",
	},
	props: {
		// inline:true,
		labelPosition: "top",
		labelWidth: 60,
		size: "default",

		model: formLabelAlign,

	},
	//
	slots: {
		default: {
			type: "wrap",
			value: [
				{
					sys: {
						//
						component: "el-form-item",
					},
					props: {
						//

						prop: "name",
						labelWidth: "50px",
						required: true,
					},
					slots: {
						label: [
							'NAME', {

								'~component': 'lc-icon',
								icon: 'mdiHelpCircleOutline',
								tooltip: 'This is a tooltip',
							}
						],
						default: {
							type: "wrap",
							value: {
								sys: {
									component: "ElInput",
									//Use a computed to config modelValue
									modelValue: computed({
										get() {
											return formLabelAlign.name;
										},
										set(valueNew) {
											formLabelAlign.name = valueNew;
										},
									}),
								},
								props: {

									placeholder: "Please input name to filter",
									clearable: false,
								},
							},
						},
					},
				},
				{
					sys: {
						//
						component: "el-form-item",

					},
					props: {
						prop: "Region",
					},
					slots: {
						label: {
							'~component': 'div',
							'~classes': ['lc-common-toolbar'],
							'~styles':{'background-color':'transparent'},
							'#': [
								{
									'~component': 'div',
									'#': [
										'Region', {

											'~component': 'lc-icon',
											icon: 'mdiHelpCircleOutline',
											tooltip: 'Whether the region <br>is choosed',
										}]
								},
								{

									'~component': 'lc-icon',
									icon: 'mdiHelpCircleOutline',
									tooltip: 'Whether the region <br>is choosed',
								}
							]
						},
						default: {
							type: "wrap",
							value: {
								sys: {
									component: "ElSwitch",
									//Use modelValuePath config modelValue
									modelValue: formLabelAlign,
									modelValuePath: "region",
								},
								props: {
									placeholder: "Input address to filter",
								},
							},
						},
					},
				},
			],
		},
	},
	events: {

	},
})
</script>
  