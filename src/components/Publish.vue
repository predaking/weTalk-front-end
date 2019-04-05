<template>
<div>
  <Card id="topSide" :bordered="false">
    <Icon type="ios-arrow-back" id="back" @click="$router.go(-1)"></Icon>发布动态
    <span style="position:absolute;right:20px">发布</span>
  </Card>
  <div id="content">
    <textarea id="textArea" placeholder="说你所想..."></textarea>
    <Row>
      <Col span="8" class="demo-upload-list" v-for="(item, index) in uploadList" :key="index" ref="myImgBox">
        <img :src="item.url" ref="myImg">
        <!-- <div class="demo-upload-list-cover"> -->
          <Icon type="ios-close" @click.native="handleRemove(item)" id="moveIcon"></Icon>
        <!-- </div> -->
      </Col>
      <Upload
        id="upload"
        ref="upload"
        :show-upload-list="false"
        :format="['jpg','jpeg','png','webp']"
        :max-size="2048"
        :before-upload="handleBeforeUpload"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        type="drag"
        action=""
        multiple
        style="display: inline-block;height:100px;line-height: 100px;width:33.3333%;min-width:100px"
        :class="{ hideUpLoadSign: isHidden}">
        <div style="width: 100%;height:100px;line-height: 100px;color:whitesmoke">
          <Icon type="ios-add" size="80"></Icon>
        </div>
      </Upload>
      <p style="margin-top:5px"><Icon type="ios-pin-outline" style="font-size:18px;margin-top:-4px"></Icon>{{pos}}</p>
    </Row>
  </div>
</div>
</template>
<script>
var MAX_LENGTH = 9
export default {
  name: 'Publish',
  data() {
    return {
      uploadList: [],
      isHidden: false,
      imgsrc: [],
      city: '定位中...',
      cityCode: '',
      district: '',
      province: '',
      street: '',
      streetNumber: ''
    }
  },
  mounted() {
    // this.$store.commit('countTest');
    console.log("此时的count：" + this.$store.state.count)
    var that = this;
    var geolocation = new BMap.Geolocation({
      maximumAge:10
    });
    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        that.city = r.address.city;
        that.district = r.address.district;
        that.street = r.address.street;
        that.streetNumber = r.address.street_number;
      } else {
        alert('failed' + this.getStatus());
      }
    }, {
      enableHighAccuracy: true
    })
  },
  methods: {
    handleBeforeUpload(file) {
      // 创建一个 FileReader 对象
      let reader = new FileReader()
      reader.readAsDataURL(file)
      const _this = this
      reader.onloadend = function(e) {
        file.url = reader.result
        if (file.type.slice(0, 5) == "image") {
            var check = _this.uploadList.length < MAX_LENGTH;
            if (!check) {
              _this.$Notice.warning({
                title: '最多上传九张照片'
              })
              return check
            }
            _this.uploadList.push(file)
            if(_this.uploadList.length > MAX_LENGTH - 1)
              _this.isHidden = true
        }
      }
    },
    handleRemove(file) {
      this.uploadList.splice(this.uploadList.indexOf(file), 1)
      this.uploadList.length > MAX_LENGTH - 1 ? this.isHidden = true : this.isHidden = false
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
      })
    },
  },
  computed: {
    pos: function() {
      return this.city + this.district;
    }
  }
}
</script>

<style scoped>
#content {
  background-color: #fff;
  padding: 70px 16px 20px;
}

#textArea {
  border: 0;
  width: fill-available;
  height: 150px;
  resize: none;
}

.hideUpLoadSign {
  display: none !important;
}

.demo-upload-list {
  display: inline-block;
  /* width: 100%; */
  /* width: 33%; */
  min-width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  /* border: 1px solid transparent; */
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  /* box-shadow: 0 1px 1px rgba(0, 0, 0, .2); */
}

.demo-upload-list img {
  width: 100%;
  height: 100px;
}

.demo-upload-list-cover {
  /* width: 100px; */
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right:0;
  /* background: rgba(0, 0, 0, .6); */
}

.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}

.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}

.demo-upload-list #moveIcon {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  background-color: rgba(0,0,0,0.6);
}

</style>
<style>
#upload .ivu-upload-drag {
  height: 100px;
}
</style>
