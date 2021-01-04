<template>
  <page-header-wrapper :breadcrumb="false">
    <template v-slot:content>
      <div class="page-header-content">
        <div class="content">
          <div class="measure-grid">
            <div
              class="mg-wrap"
              :style="{
              transform: `translateX(-${translateX}px)`,
              width: wrapWidth + 'px',
              height: wrapHeight + 'px'
            }">
              <div v-for="item in listData" class="mg-station" :key="item.name">
                <p class="mg-station-name">{{ item.name }}</p>
                <div v-for="(subItem, index) in item.pos" :key="`pos${index}`" class="mg-pos">
                  <span class="mg-point"></span>
                </div>
              </div>
            </div>
          </div>
          <a-button type="primary" @click="onPrevClick">
            上一页
          </a-button>&nbsp;&nbsp;
          <a-button type="primary" @click="onNextClick">
            下一页
          </a-button>
        </div>
      </div>
    </template>
  </page-header-wrapper>
</template>

<script>
/*
@-------@-------@-------@-------@
|		    |		    |		    |		    |
@-------@-------@-------@-------@
|		    |		    |		    |		    |
@-------@-------@-------@-------@
|		    |		    |		    |		    |
@-------@-------@-------@-------@
|		    |		    |		    |		    |
@-------@-------@-------@-------@
|		    |		    |		    |		    |
@-------@-------@-------@-------@
*/
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'

export default {
  name: 'CoordinationSystem',
  components: {
    PageHeaderWrapper
  },
  data () {
    return {
      contentWidth: 0,
      listData: [{
        name: 'A0',
        pos: [
          { x: 1, y: 1, color: '#000' },
          { x: 2, y: 2, color: '#111' },
          { x: 3, y: 3, color: '#222' },
          { x: 4, y: 4, color: '#333' },
          { x: 5, y: 5, color: '#444' }
        ]
      }, {
        name: 'A1',
        pos: [
          { x: 1, y: 1, color: '#000' },
          { x: 2, y: 2, color: '#111' },
          { x: 3, y: 3, color: '#222' },
          { x: 4, y: 4, color: '#333' },
          { x: 5, y: 5, color: '#444' }
        ]
      }, {
        name: 'A2',
        pos: [
          { x: 1, y: 1, color: '#000' },
          { x: 2, y: 2, color: '#111' },
          { x: 3, y: 3, color: '#222' },
          { x: 4, y: 4, color: '#333' },
          { x: 5, y: 5, color: '#444' }
        ]
      }, {
        name: 'A3',
        pos: [
          { x: 1, y: 1, color: '#000' },
          { x: 2, y: 2, color: '#111' },
          { x: 3, y: 3, color: '#222' },
          { x: 4, y: 4, color: '#333' },
          { x: 5, y: 5, color: '#444' }
        ]
      }, {
        name: 'A4',
        pos: [
          { x: 1, y: 1, color: '#000' },
          { x: 2, y: 2, color: '#111' },
          { x: 3, y: 3, color: '#222' },
          { x: 4, y: 4, color: '#333' },
          { x: 5, y: 5, color: '#444' }
        ]
      }, {
        name: 'A5',
        pos: [
          { x: 1, y: 1, color: '#000' },
          { x: 2, y: 2, color: '#111' },
          { x: 3, y: 3, color: '#222' },
          { x: 4, y: 4, color: '#333' },
          { x: 5, y: 5, color: '#444' }
        ]
      }, {
        name: 'A6',
        pos: [
          { x: 1, y: 1, color: '#000' },
          { x: 2, y: 2, color: '#111' },
          { x: 3, y: 3, color: '#222' },
          { x: 4, y: 4, color: '#333' },
          { x: 5, y: 5, color: '#444' }
        ]
      }, {
        name: 'A7',
        pos: [
          { x: 1, y: 1, color: '#000' },
          { x: 2, y: 2, color: '#111' },
          { x: 3, y: 3, color: '#222' },
          { x: 4, y: 4, color: '#333' },
          { x: 5, y: 5, color: '#444' }
        ]
      }, {
        name: 'A8',
        pos: [
          { x: 1, y: 1, color: '#000' },
          { x: 2, y: 2, color: '#111' },
          { x: 3, y: 3, color: '#222' },
          { x: 4, y: 4, color: '#333' },
          { x: 5, y: 5, color: '#444' }
        ]
      }, {
        name: 'A9',
        pos: [
          { x: 1, y: 1, color: '#000' },
          { x: 2, y: 2, color: '#111' },
          { x: 3, y: 3, color: '#222' },
          { x: 4, y: 4, color: '#333' },
          { x: 5, y: 5, color: '#444' }
        ]
      }, {
        name: 'A10',
        pos: [
          { x: 1, y: 1, color: '#000' },
          { x: 2, y: 2, color: '#111' },
          { x: 3, y: 3, color: '#222' },
          { x: 4, y: 4, color: '#333' },
          { x: 5, y: 5, color: '#444' }
        ]
      }],
      translateX: 0
    }
  },
  computed: {
    wrapWidth () {
      return (this.listData && this.listData.length) ? this.listData.length * 200 + 20 : 0
    },
    wrapHeight () {
      return (this.listData && this.listData.length) ? this.listData[0].pos.length * 50 : 250
    }
  },
  created () {
  },
  mounted () {
    this.contentWidth = this.getContentWidth()

    window.addEventListener('resize', () => {
      this.contentWidth = this.getContentWidth()
    })
  },
  methods: {
    getContentWidth () {
      return document.getElementsByClassName('ant-page-header-content')[0].offsetWidth
    },
    onPrevClick () {
      this.translateX -= this.contentWidth
      if (this.translateX < 0) {
        this.translateX = 0
      }
    },
    onNextClick () {
      this.translateX += this.contentWidth
      const maxTrans = this.wrapWidth - this.contentWidth + 60
      if (this.translateX > maxTrans) {
        this.translateX = maxTrans
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./measure-grid.less";
</style>
