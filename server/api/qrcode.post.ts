export default defineEventHandler(async (event) => {
  const { SD_API_URL } = useRuntimeConfig()
  const params = await readBody(event)

  await $fetch(`${SD_API_URL}/sdapi/v1/options`, {
    method: 'POST',
    body: {
      sd_model_checkpoint: 'primemix_v21.safetensors [b79a4f7283]',
      sd_vae: 'kl-f8-anime2.vae.pt',
    },
  })

  const { qrcode, sd_options } = params

  sd_options.alwayson_scripts.controlnet.args[0].input_image = qrcode
  sd_options.alwayson_scripts.controlnet.args[1].input_image = qrcode

  return $fetch(`${SD_API_URL}/sdapi/v1/txt2img`, {
    method: 'POST',
    body: sd_options,
  })
})
