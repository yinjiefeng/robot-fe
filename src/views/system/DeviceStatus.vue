<template>
  <page-header-wrapper :breadcrumb="false">
    <template v-slot:content>
      <div class="page-header-content">
        <div class="content">
          <div class="content-title">
            <span class="welcome-text">{{ welcome }}</span>
          </div>
          <a-table
            ref="table"
            size="default"
            rowKey="key"
            :columns="columns"
            :dataSource="tableData"
            :pagination="false"
            :bordered="true"
          >
            <template slot="name" slot-scope="text">
              <a>{{ text }}</a>
            </template>
          </a-table>
        </div>
      </div>
    </template>
  </page-header-wrapper>
</template>

<script>
import { mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { STable } from '@/components'

export default {
  name: 'DeviceStatus',
  components: {
    PageHeaderWrapper,
    STable
  },
  data () {
    return {
      columns: [
        {
          title: '序号',
          dataIndex: 'key'
        },
        {
          title: '步骤',
          dataIndex: 'step',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {}
            }
            if (index === 0) {
              obj.attrs.rowSpan = 3
              obj.attrs.style = { color: 'red' }
            } else if (index === 3) {
              obj.attrs.rowSpan = 2
            } else if (index === 5) {
              obj.attrs.rowSpan = 2
            } else {
              obj.attrs.rowSpan = 0
            }
            return obj
          }
        },
        {
          title: '参数名称',
          dataIndex: 'paramName'
        },
        {
          title: '北坐标',
          dataIndex: 'north'
        },
        {
          title: '东坐标',
          dataIndex: 'east'
        },
        {
          title: '高程',
          dataIndex: 'height'
        },
        {
          title: '备注',
          dataIndex: 'remark'
        }
      ],
      tableData: [
        {
          key: '1',
          step: '自动行驶',
          paramName: '当前位置',
          north: '0.100',
          east: '1.00',
          height: 100,
          remark: '备注1'
        },
        {
          key: '2',
          step: '自动行驶',
          paramName: '目标位置',
          north: '0.100',
          east: '1.00',
          height: 100,
          remark: '备注2'
        },
        {
          key: '3',
          step: '自动行驶',
          paramName: '到达位置',
          north: '0.100',
          east: '1.00',
          height: 100,
          remark: '备注3'
        },
        {
          key: '4',
          step: '自动调平',
          paramName: '起始状态',
          north: '0.100',
          east: '1.00',
          height: 100,
          remark: '备注4'
        },
        {
          key: '5',
          step: '自动调平',
          paramName: '结束状态',
          north: '0.100',
          east: '1.00',
          height: 100,
          remark: '备注5'
        },
        {
          key: '6',
          step: '快速设站',
          paramName: '设站结果',
          north: '0.100',
          east: '1.00',
          height: 100,
          remark: '备注6'
        },
        {
          key: '7',
          step: '快速设站',
          paramName: '设站质量',
          north: '0.100',
          east: '1.00',
          height: 100,
          remark: '备注7'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      nickname: (state) => state.user.nickname,
      welcome: (state) => state.user.welcome
    }),
    currentUser () {
      return {
        name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
      }
    },
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>

</style>
