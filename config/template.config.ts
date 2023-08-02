export const templates = [{
  image: '/templates/template_1.jpg',
  title: '花园',
  sd_options: {
    cfg_scale: 7,
    seed: -1,
    prompt: 'best quality, masterpiece, depth of field, 1girl, dress, trees, flowers, sky, water',
    negative_prompt: 'NSFW, nude, bad-hands-5, bad-picture-chill-75v, badhandv4, easynegative, ng_deepnegative_v1_75t, verybadimagenegative_v1.3, bhands-neg, watermark, character watermark, photo date watermark, Date watermarking',
    sampler_name: 'DPM++ 2M SDE Karras',
    steps: 50,
    width: 1024,
    height: 1024,
    alwayson_scripts: {
      ADetailer: {
        args: [
          true,
          {
            ad_model: 'person_yolov8n-seg.pt',
            ad_mask_blur: -4,
          },
        ],
      },
      controlnet: {
        args: [
          {
            input_image: '$INPUT_IMAGE_BASE64',
            weight: 1.35,
            model: 'control_v1p_sd15_qrcode_monster [a6e58995]',
            guidance_start: 0,
            guidance_end: 1,
            resize_mode: 'Scale to Fit (Inner Fit)',
            lowvram: false,
            control_mode: 0,
            pixel_perfect: true,
          },
          {
            input_image: '$INPUT_IMAGE_BASE64',
            weight: 0.3,
            model: 'control_v1p_sd15_brightness [5f6aa6ed]',
            guidance_start: 0.5,
            guidance_end: 0.8,
            resize_mode: 'Scale to Fit (Inner Fit)',
            control_mode: 0,
            pixel_perfect: true,
          },
        ],
      },
    },
  },
}]
