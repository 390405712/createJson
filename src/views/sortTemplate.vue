<template>
  <el-card class="sortTemplate">
    <div class="cards">
      <div v-for="(card, index) in $store.state.cards" :key="index" :value="card.value" :sort-index="card.sortIndex" :is-active="card.isActive" :is-locked="card.isLocked">
        <div class="card-wrapper" :data-sort-index="card.sortIndex" :style="{height: card.value * HEIGHT_INCREMENT + 'px',transform: 'translateX('+card.sortIndex*100+'%)'}">
          <div class="card" :class="{'card-active':card.isActive,'card-locked':card.isLocked}">
            <div class="value">{{card.value}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="control-panel">
      <el-button size="mini"  @click="reset(0)">【1.1】简易版冒泡排序</el-button>
      <el-button size="mini"  @click="reset(1)">【1.2】普通版冒泡排序</el-button>
      <el-button size="mini"  @click="reset(2)">【1.3】双向冒泡排序</el-button>
      <el-button size="mini"  @click="reset(3)">【1.4】改进版冒泡排序</el-button>
      <el-button size="mini"  @click="reset(4)">【2】选择排序</el-button>
      <el-button size="mini"  @click="reset(5)">【3】插入排序</el-button>
      <el-button size="mini"  @click="reset(6)">【4】希尔排序</el-button>
      <el-button size="mini"  @click="reset(7)">【5】归并排序(没有图解)</el-button>
      <el-button size="mini"  @click="reset(8)">【6】快速排序(没有图解)</el-button>
      <el-button size="mini"  @click="reset(9)">【7】堆排序(没有图解)</el-button>
      <el-button size="mini"  @click="reset(10)">【8】计数排序(没有图解)</el-button>
      <el-button size="mini"  @click="reset(11)">【9】桶排序(没有图解)</el-button>
      <el-button size="mini"  @click="reset(12)">【10】基数排序(没有图解)</el-button>
    </div>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        SORT_ARRAY : [3,44,38,5,47,15,36,26,27,2,46,50,4,19,48],
        // SORT_ARRAY : [3,44,38,5,47],
        EVENT_DELAY : 200,
        HEIGHT_INCREMENT : 10,
        mergeSortSequence:[],
      }
    },
    watch: {},
    mounted() {
      let values = this.SORT_ARRAY.slice();
      this.$store.commit({ type: 'reset', values: values });
    },
    methods: {
      reset(index) {
        let values = this.SORT_ARRAY.slice();
        this.$store.commit({ type: 'reset', values: values });

        let sequence = [];
        if(index == 0){
          sequence = this.bubbleSort0(values);
        }
        else if(index == 1){
          sequence = this.bubbleSort1(values);
        }
         else if(index == 2){
          sequence = this.bubbleSort2(values);
        }
        else if(index == 3){
          sequence = this.bubbleSort3(values);
        }
        else if(index == 4){
          sequence = this.selectionSort(values);
        }
        else if(index == 5){
          sequence = this.insertionSort(values);
        }
        else if(index == 6){
          sequence = this.shellSort(values);
        }
        else if(index == 7){
          this.mergeSort(values);
        }
        else if(index == 8){
          this.quickSort(values,0,values.length-1);
        }
        else if(index == 9){
          this.heapSort(values);
        }
        else if(index == 10){
          this.countingSort(values,values.length);
        }
        else if(index == 11){
          this.bucketSort(values);
        }
        else if(index == 12){
          this.radixSort(values);
        }
        // 遍历上边排序得到的数组，定时执行操作，实现动画效果
        sequence.forEach((event, index) => {
          setTimeout(() => { this.$store.commit(event); }, index * this.EVENT_DELAY);
        });
      },
      // 简易版冒泡排序
      bubbleSort0(arr){
        let sequence = [];
        var lockNum = 0;
        for (var i = 0; i < arr.length; i++) {
          for (var j = 0; j < arr.length - 1; j++) {
            sequence.push({ type: 'activate', indexes: [j, j + 1] });
            if (arr[j] > arr[j+1]) {
              var tmp = arr[j];
              arr[j]=arr[j+1];
              arr[j+1]=tmp;
              sequence.push({ type: 'swap', indexes: [j, j + 1] });
            }
            sequence.push({ type: 'deactivate', indexes: [j, j + 1] });
            lockNum = j+1;
          }
        }
        sequence.push({ type: 'done' });
        console.log('包括每一步内容的数组',sequence);
        return sequence;
      },
      // 普通版冒泡排序
      bubbleSort1(arr){
        // sequence 为包括每一步内容的数组
        let sequence = [];
        // swapped 为判断是否已经排序好的 标志位
        let swapped;
        // indexLastUnsorted 用来减少不必要的循环
        let indexLastUnsorted = arr.length - 1;

        do {
          swapped = false;
          for (let i = 0; i < indexLastUnsorted; i++) {
            // card 是 state.cards 的一个成员
            // 开始一次循环，就有两个card 的 isActive的值设置为true
            sequence.push({ type: 'activate', indexes: [i, i + 1] });

            // 如果前一个数 大于 后一个数，就交换两数
            if (arr[i] > arr[i + 1]) {
              let temp = arr[i];
              arr[i] = arr[i + 1];
              arr[i + 1] = temp;
              swapped = true;
              // 满足交换的条件，就重新定义所有card的sortIndex属性
              sequence.push({ type: 'swap', indexes: [i, i + 1] });
            }
            // 结束这次循环之前，把原来两个card的isActive的值为true的，设置为false
            sequence.push({ type: 'deactivate', indexes: [i, i + 1] });
          }
          // 外层循环，每循环完一次，就锁定最后一个card，下次这个card 就不参与循环
          sequence.push({ type: 'lock', indexes: [indexLastUnsorted] });
          indexLastUnsorted--;
        } while (swapped);

        // 如果提前排序好了，把剩下的card全部锁定
        let skipped = Array.from(Array(indexLastUnsorted + 1).keys());
        sequence.push({ type: 'lock', indexes: skipped });
        // 修改done 为true，完成排序
        sequence.push({ type: 'done' });
        console.log('包括每一步内容的数组',sequence);
        return sequence;
      },
      // 双向冒泡排序
      bubbleSort2(arr){
        let sequence = [];
        var low = 0;
        var high= arr.length-1;
        var tmp,j;
        do{
          for (j= low; j< high; j++){ //正向冒泡,找到最大者
            sequence.push({ type: 'activate', indexes: [j, j + 1] });
            if (arr[j]> arr[j+1]) {
              tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
              sequence.push({ type: 'swap', indexes: [j, j + 1] });
            }
            sequence.push({ type: 'deactivate', indexes: [j, j + 1] });
          }
          sequence.push({ type: 'lock', indexes: [high] });
          high--;//修改high值, 前移一位
          for (j=high; j>low; j--){ //反向冒泡,找到最小者
            sequence.push({ type: 'activate', indexes: [j, j - 1] });
            if (arr[j]<arr[j-1]) {
              tmp = arr[j]; arr[j]=arr[j-1];arr[j-1]=tmp;
              sequence.push({ type: 'swap', indexes: [j, j - 1] });
            }
            sequence.push({ type: 'deactivate', indexes: [j, j - 1] });
          }
          sequence.push({ type: 'lock', indexes: [low] });
          low++;//修改low值,后移一位
        }while(low < high);
        let skipped = Array.from(Array(low+1).keys());
        sequence.push({ type: 'lock', indexes: skipped });
        sequence.push({ type: 'done' });
        console.log('包括每一步内容的数组',sequence);
        return sequence;
      },
      // 改进版冒泡排序
      bubbleSort3(arr){
        let sequence = [];
        var lockNum = 0;
        for (var i = 0; i < arr.length; i++) {
          var swaped = false;  //监控内层交换
          for (var j = 0; j < arr.length - 1 - i; j++) {
            sequence.push({ type: 'activate', indexes: [j, j + 1] });
            if (arr[j] > arr[j+1]) {
              var tmp = arr[j];
              arr[j]=arr[j+1];
              arr[j+1]=tmp;
              swaped = true;
              sequence.push({ type: 'swap', indexes: [j, j + 1] });
            }
            sequence.push({ type: 'deactivate', indexes: [j, j + 1] });
            lockNum = j+1;
          }
          if(!swaped) {
            for(let k = lockNum;k >=0;k--){
              let skipped = Array.from(Array(k+1).keys());
              sequence.push({ type: 'lock', indexes: skipped });
            }
            sequence.push({ type: 'done' });
            return sequence;
          }
          else{
            sequence.push({ type: 'lock', indexes: [lockNum] });
          }
        }
      },
      // 选择排序
      selectionSort(arr){
        let sequence = [];
        var len = arr.length;
        var minIndex, temp;
        for (var i = 0; i < len - 1; i++) {
          minIndex = i;
          sequence.push({ type: 'activate', indexes: [i,minIndex] });
          for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     //寻找最小的数
              minIndex = j;                 //将最小数的索引保存
            }
          }
          sequence.push({ type: 'activate', indexes: [i,minIndex] });
          sequence.push({ type: 'deactivate', indexes: [i,minIndex] });
          sequence.push({ type: 'activate', indexes: [i,minIndex] });
          sequence.push({ type: 'deactivate', indexes: [i,minIndex] });
          sequence.push({ type: 'activate', indexes: [i,minIndex] });
          sequence.push({ type: 'swap', indexes: [i,minIndex] });
          sequence.push({ type: 'deactivate', indexes: [i,minIndex] });
          temp = arr[i];
          arr[i] = arr[minIndex];
          arr[minIndex] = temp;
          sequence.push({ type: 'lock', indexes: [i] });
        }
        sequence.push({ type: 'lock', indexes: [len-1] });
        sequence.push({ type: 'done' });
        return sequence;
      },
      // 插入排序
      insertionSort(arr){
        let sequence = [];
        sequence.push({ type: 'lock', indexes: [0] });
        for (var i = 1; i < arr.length; i++) {
          sequence.push({ type: 'lock', indexes: [i] });
          var key = arr[i];
          var j = i - 1;
          while (j >= 0 && arr[j] > key) {
            sequence.push({ type: 'activate', indexes: [j,j+1 ] });
            sequence.push({ type: 'swap', indexes: [j,j+1 ] });
            sequence.push({ type: 'deactivate', indexes: [j,j+1 ] });
            arr[j + 1] = arr[j];
            j--;
          }
          arr[j + 1] = key;
        }
        sequence.push({ type: 'done' });
        return sequence;
      },
      // 希尔排序
      shellSort(arr){
        let sequence = [];
        var len = arr.length,
          temp,
          gap = 1;
        while(gap < len/3) {//动态定义间隔序列
          gap =gap*3+1;
        }
        for (gap; gap > 0; gap = Math.floor(gap/3)) {
          for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
              sequence.push({ type: 'activate', indexes: [j,j+gap] });
              sequence.push({ type: 'swap', indexes: [j,j+gap] });
              sequence.push({ type: 'deactivate', indexes: [j,j+gap] });
              if(gap == 1){
                sequence.push({ type: 'lock', indexes: [j,j+gap] });
              }
              arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
          }
        }
        sequence.push({ type: 'done' });
        return sequence;
      },
      // 归并排序
      mergeSort(arr) {  //采用自上而下的递归方法
        var len = arr.length;
        if (len < 2) {
          return arr;
        }
        var middle = Math.floor(len / 2),
          left = arr.slice(0, middle),
          right = arr.slice(middle);
        return this.merge(this.mergeSort(left), this.mergeSort(right));
      },
      merge(left, right) {
        console.log('开始merge')
        console.log('进入状态：',left,right)
        var result = [];
        while (left.length && right.length) {
          if (left[0] <= right[0]) {
            console.log('进入条件1');
            result.push(left.shift());
            console.log(result);
          } else {
            console.log('进入条件2');
            result.push(right.shift());
            console.log(result);
          }
        }
        while (left.length){
          console.log('进入条件3');
          result.push(left.shift());
          console.log(result);
        }
        while (right.length){
          console.log('进入条件4');
          result.push(right.shift());
          console.log(result);
        }
        console.log('result:'+result);
        return result;
      },
      // 快速排序
      quickSort(arr, left, right) {
        var len = arr.length,
          partitionIndex,
          left = typeof left != 'number' ? 0 : left,
          right = typeof right != 'number' ? len - 1 : right;
        if (left < right) {
          partitionIndex = this.partition(arr, left, right);
          this.quickSort(arr, left, partitionIndex - 1);
          this.quickSort(arr, partitionIndex + 1, right);
        }
        return arr;
      },
      partition(arr, left, right) {     //分区操作
        console.log(arr,left,right);
        var pivot = left,                      //设定基准值（pivot）
          index = pivot + 1;
        for (var i = index; i <= right; i++) {
          if (arr[i] < arr[pivot]) {
            this.swap(arr, i, index);
            index++;
          }
        }
        this.swap(arr, pivot, index - 1);
        console.log('result:'+arr);
        return index - 1;
      },
      swap(arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      },
      // 堆排序
      heapSort(array) {
        //建堆
        var heapSize = array.length, temp;
        for (var i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
          this.heapify(array, i, heapSize);
        }
        //堆排序
        for (var j = heapSize - 1; j >= 1; j--) {
          temp = array[0];
          array[0] = array[j];
          array[j] = temp;
          this.heapify(array, 0, --heapSize);
        }
        return array;
      },
      heapify(arr, x, len) {
        var l = 2 * x + 1, r = 2 * x + 2, largest = x, temp;
        if (l < len && arr[l] > arr[largest]) {
          largest = l;
        }
        if (r < len && arr[r] > arr[largest]) {
          largest = r;
        }
        if (largest != x) {
          temp = arr[x];
          arr[x] = arr[largest];
          arr[largest] = temp;
          this.heapify(arr, largest, len);
        }
      },
      // 计数排序
      countingSort(arr, maxValue) {
        var bucket = new Array(maxValue+1),
          sortedIndex = 0,
          arrLen = arr.length,
          bucketLen = maxValue + 1;

        for (var i = 0; i < arrLen; i++) {
          if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
          }
          bucket[arr[i]]++;
        }

        for (var j = 0; j < bucketLen; j++) {
          while(bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
          }
        }
        return arr;
      },
      // 桶排序
      bucketSort(arr, bucketSize) {
        if (arr.length === 0) {
          return arr;
        }

        var i;
        var minValue = arr[0];
        var maxValue = arr[0];
        for (i = 1; i < arr.length; i++) {
          if (arr[i] < minValue) {
            minValue = arr[i];                //输入数据的最小值
          } else if (arr[i] > maxValue) {
            maxValue = arr[i];                //输入数据的最大值
          }
        }

        //桶的初始化
        var DEFAULT_BUCKET_SIZE = 5;            //设置桶的默认数量为5
        bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
        var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
        var buckets = new Array(bucketCount);
        for (i = 0; i < buckets.length; i++) {
          buckets[i] = [];
        }

        //利用映射函数将数据分配到各个桶中
        for (i = 0; i < arr.length; i++) {
          buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
        }
        console.log(buckets);
        arr.length = 0;
        for (i = 0; i < buckets.length; i++) {
          this.bucketSortInsertionSort(buckets[i]);                      //对每个桶进行排序，这里使用了插入排序
          for (var j = 0; j < buckets[i].length; j++) {
            arr.push(buckets[i][j]);
          }
        }
        console.log(arr);
        return arr;
      },
      bucketSortInsertionSort(arr) {
        var arr = arr;
        for (var i = 1; i < arr.length; i++) {
          var key = arr[i];
          var j = i - 1;
          while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
          }
          arr[j + 1] = key;
        }
        return arr;
      },
      // 基数排序
      radixSort(arr, maxDigit) {
        var mod = 10;
        var dev = 1;
        var counter = [];
        for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
          for (var j = 0; j < arr.length; j++) {
            var bucket = parseInt((arr[j] % mod) / dev);
            if (counter[bucket] == null) {
              counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
          }
          var pos = 0;
          for (var j = 0; j < counter.length; j++) {
            var value = null;
            if (counter[j] != null) {
              while ((value = counter[j].shift()) != null) {
                arr[pos++] = value;
              }
            }
          }
        }
        return arr;
      },
    }
  }
</script>

<style scoped>
  .sortTemplate {
    color: #fff;
    background-color: #000;
    height: calc(100vh - 88px);
    width: calc(100% - 40px);
    margin: 0 auto;
  }
  .el-card__body{
    height: 100%;
  }
  .cards {

    position: relative;
    height: calc(100vh - 255px);
    /*height: 400px;*/
    /*width: 1000px;*/
    /*margin: 0 auto;*/
  }
  .card-wrapper {
    position: absolute;
    bottom: 0;
    width: 6.25%;
    transition: -webkit-transform 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition: transform 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition: transform 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275), -webkit-transform 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card {
    position: relative;
    height: 100%;
    margin: 0 5px;
    border: 1px solid #ff3179;
    background-color: #000;
    box-shadow: 0 0 25px #c2255c;
  }

  .card-active {
    -webkit-filter: hue-rotate(200deg);
    filter: hue-rotate(200deg);
  }

  .card-locked {
    -webkit-filter: hue-rotate(280deg);
    filter: hue-rotate(280deg);
  }

  .value {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 1.25rem;
  }

  .control-panel {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 30px 5px 0;
    /*border-top: 1px solid #fff;*/
    height: 80px;
  }

  h1 {
    margin: 0;
    font-size: 2.5rem;
  }
</style>
