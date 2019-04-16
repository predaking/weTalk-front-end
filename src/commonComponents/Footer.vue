<template>
    <Row id="footer">
      <Col class="col" span="8"
        v-for="(tab, index) in tabs"
        :key="index"
        @click.native="navigate(index)"
        :class="{activeClass:index==currentTab}">
        <Icon class="icon" :type="index==currentTab?tab.icon:tab.outlineIcon"></Icon><br />
        {{tab.text}}
      </Col>
    </Row>
</template>

<script>
  export default {
    data() {
      return {
        currentTab: 0,
        activeIcon: false,
        tabs: [{
          text: "首页",
          icon: "ios-home",
          outlineIcon: "ios-home-outline",
          path: '/Main'
        },
        {
          text: "发布",
          icon: "ios-add-circle",
          outlineIcon: "ios-add-circle-outline",
          path: '/Publish'
        },
        {
          text: "我的",
          icon: "ios-person",
          outlineIcon: "ios-person-outline",
          path: '/Me'
        }]
      }
    },
    mounted() {
      switch(this.$route.fullPath) {
        case '/Main': {
          this.currentTab = 0;
          break;
        }
        case '/Publish': {
          this.currentTab = 1;
          break;
        }
        case '/Me': {
          this.currentTab = 2;
          break;
        }
      }
    },
    methods: {
      navigate: function(inx) {
        this.$router.push(this.tabs[inx].path);
      },
    }
  }
</script>

<style scoped>
#footer {
  position: fixed;
  bottom: 0px;
  z-index: 1;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid #eee;
  width: fill-available;
  width: -webkit-fill-available;
  background-color: #fff;
  font-size: 15px;
  text-align: center;
}
.icon {
  font-size: 25px;
}
.activeClass {
  color: blue;
}
.col {

}
</style>
