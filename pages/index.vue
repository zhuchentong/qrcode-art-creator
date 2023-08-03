<template>
  <section class="space-y-2">
    <ElCard>
      <template #header>
        <div class="flex justify-between items-center">
          <div>输入二维码内容</div>
          <div>
            <ElSwitch
              v-model="qrcodeInputMethod"
              active-text="图片"
              active-value="image"
              inactive-text="文字"
              inactive-value="text"
              size="small"
              style="--el-switch-on-color: #ff4949; --el-switch-off-color: #13ce66"
            />
          </div>
        </div>
      </template>

      <div v-show="qrcodeInputMethod === 'text'">
        <ElInput v-model="qrcodeInputText" placeholder="请输入生成二维码的链接或文本" type="textarea" />
      </div>
      <div v-show="qrcodeInputMethod === 'image'">
        <ElUpload
          v-model:file-list="qrcodeInputImages"
          :auto-upload="false"
          class="w-full flex-center min-h-[200px] rounded"
          css:border="~ gray dashed"
          :show-file-list="false"
        >
          <img v-if="qrcodeInputImages.length" class="w-[80%] h-auto" :src="qrcodeInputImageURL">
          <div v-else class="i-icon-park-outline:plus text-[40px]" />
        </ElUpload>
      </div>
    </ElCard>
    <ElCard header="选择款式">
      <el-row :gutter="20">
        <el-col
          v-for="(template, index) in templates"
          :key="index"
          class="my-5"
          :span="12"
          @click="() => activeTemplate = template"
        >
          <div
            class="template-item p-2 rounded-xl"
            :class="{ active: activeTemplate?.title === template.title }"
            css:border="~-2  gray-200 solid"
          >
            <img class="w-full" :src="template.image">
            <div class="text-center text-sm text-gray">
              {{ template.title }}
            </div>
          </div>
        </el-col>
      </el-row>
    </ElCard>
    <div class="flex-center py-5">
      <ElButton size="large" type="primary" @click="onSubmit">
        开始生成
      </ElButton>
    </div>
    <div v-if="qrcodeResult" header="二维码">
      <div class="flex-center mb-10">
        <img class="w-[80%]" :src="`data:image/png;base64,${qrcodeResult}`">
      </div>
    </div>
  </section>
  <canvas ref="canvasRef" class="w-[512px] h-[512px] opacity-0 absolute left-[-9999px] top-[-9999px]" />
</template>

<style lang="scss" scoped>
.template-item {
  &.active{
    border-color: rgba(14,165,233,var(--un-border-opacity));
  }
  img{
    -webkit-user-drag: none;
  }
}
</style>

<script setup lang="ts">
import QrcodeDecoder from 'qrcode-decoder'
import { eccMap, generateQRCode } from '@/utils/qrcodedraw'
import { QrCode } from '@/utils/qrcodegen'

import { templates } from '@/config/template.config'

let qrcodeResult = $ref<string>()
const activeTemplate = $ref<typeof templates[number]>(templates[0])
const qrcodeInputMethod = $ref<'text' | 'image'>('text')
const qrcodeInputText = $ref<string>('')
const qrcodeInputImages = $ref<any[]>([])

const qrcodeInputImageURL = computed(() => {
  if (qrcodeInputImages.length)
    return URL.createObjectURL(qrcodeInputImages[0].raw)

  else return ''
})

const canvasRef = $ref<HTMLCanvasElement>()

function generateQrcodeByText(text: string) {
  const seg = QrSegment.makeSegments(text)
  const qr = QrCode.encodeSegments(
    seg,
    eccMap.H,
    1,
    40,
    1,
    true,
  )

  generateQRCode(qr, canvasRef!)

  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(canvasRef?.toDataURL('base64') || '')
    }, 300)
  })
}

async function onSubmit() {
  let qrcodeImageBase64: string | undefined = ''
  if (qrcodeInputMethod === 'text')
    qrcodeImageBase64 = await generateBase64FromText()

  if (qrcodeInputMethod === 'image')
    qrcodeImageBase64 = await generateBase64FromImage()

  if (qrcodeImageBase64) {
    const loading = ElLoading.service({ fullscreen: true, text: '正在生成中...' })

    try {
      const { images } = await $fetch<{ images: string[] }>('/api/qrcode', {
        method: 'POST',
        body: {
          qrcode: qrcodeImageBase64,
          sd_options: activeTemplate.sd_options,
        },
      })

      qrcodeResult = images[0]
    }
    catch (ex) {
      ElMessage({
        message: '二维码生成失败',
        type: 'error',
      })
    }
    finally {
      loading.close()
    }
  }
}

function generateBase64FromText() {
  if (!qrcodeInputText) {
    ElMessage({
      message: '请输入需要生成二维码的文本',
      type: 'error',
    })
    return
  }

  return generateQrcodeByText(qrcodeInputText)
}

async function generateBase64FromImage() {
  if (!qrcodeInputImageURL.value) {
    ElMessage({
      message: '请输入需要生成二维码的图片',
      type: 'error',
    })

    return
  }

  const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })

  const base64Str = await toBase64(qrcodeInputImages[0].raw)

  const qrcodeDecorder = new QrcodeDecoder()

  return new Promise<string>((resolve) => {
    const img = new Image()
    img.src = base64Str
    img.onload = () => {
      qrcodeDecorder.decodeFromImage(img).then(async (res) => {
        const qrcodeBase64 = await generateQrcodeByText(res.data)
        resolve(qrcodeBase64)
      })
    }
  })
}
</script>
