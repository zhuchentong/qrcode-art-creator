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
}, {
  image: '/templates/template_2.jpg',
  title: '草原',
  sd_options: {
    cfg_scale: 7,
    seed: -1,
    prompt: 'upper body, (best quality), (masterpiece), (solo), 1girl, block hair, brown eyed, medium length hair, blue dress, grass, flowers, lake, trees, mountains, sunny, sunlight,  looking at viewer<lora:sophie_hatter:1>, grassland,distant view，',
    negative_prompt: 'EasyNegative, badhandv4, (worst quality, low quality:1.4), greyscale, border, artist name, out of frame, zombie',
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
}, {
  image: '/templates/template_3.jpg',
  title: '夕阳',
  sd_options: {
    cfg_scale: 7,
    seed: -1,
    prompt: 'best quality,masterpiece,depth of field,1girl,prospect,a huge castle,the setting sun,illumination,balcony,bright,setting sun,the sun,lateral face,the boundary between the top and bottom of the screen,',
    negative_prompt: 'nsfw, low quality, cropped, monochrome, lowres, low saturation, jpeg artifacts, watermark, white letters, skin spots, acnes, skin blemishes, age spot, mutated hands, mutated fingers, deformed, bad anatomy, disfigured, poorly drawn face, extra limb, ugly, poorly drawn hands, missing limb, floating limbs, disconnected limbs, out of focus, long neck, long body, extra fingers, fewer fingers, multi nipples, bad hands, signature, username, bad feet, blurry, bad body',
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
}, {
  image: '/templates/template_4.jpg',
  title: '清晨',
  sd_options: {
    cfg_scale: 7,
    seed: -1,
    prompt: 'best quality,masterpiece,depth of field,1girl,morning,sunlight,dickey,tree,flower,garden,take a walk,water,grass green color,the sun,sunlight in the upper left corner,flying birds,the bright sun,',
    negative_prompt: 'nsfw, low quality, cropped, monochrome, lowres, low saturation, jpeg artifacts, watermark, white letters, skin spots, acnes, skin blemishes, age spot, mutated hands, mutated fingers, deformed, bad anatomy, disfigured, poorly drawn face, extra limb, ugly, poorly drawn hands, missing limb, floating limbs, disconnected limbs, out of focus, long neck, long body, extra fingers, fewer fingers, multi nipples, bad hands, signature, username, bad feet, blurry, bad body',
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
