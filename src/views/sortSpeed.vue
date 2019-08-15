<template>
    <el-card class="sortSpeed">
      <div>开后台看打印</div>
      <div>
        填写需要排序的数量  <el-input-number v-model="count" :min="1" :max="1000000" label="描述文字"></el-input-number>
        <el-button @click="initFn">开始排序</el-button>
      </div>
    </el-card>
</template>

<script>
  export default {
    data() {
      return {
        arr: [],
        count: 0,
        chartsName: [],
        chartsData: [],
      }
    },
    methods: {
      initFn() {
        let _self = this;
        for (var i = 0; i < this.count; i++) {
          this.arr.push(Math.round(Math.random() * (500 - 100) + 100));
        }
        var promise = new Promise(function (resolve, reject) {
          resolve();
        });
        promise.then(function () {
          _self.quickSort(_self.arr);
        })
        // promise.then(function () {
        //   console.time('冒泡排序耗时');
        //   _self.bubbleSort(_self.arr);
        //   console.timeEnd('冒泡排序耗时');
        // }).then(function () {
        //   console.time('改进后冒泡排序耗时');
        //   _self.bubbleSort2(_self.arr);
        //   console.timeEnd('改进后冒泡排序耗时');
        // }).then(function () {
        //   console.time('正反冒泡排序耗时');
        //   _self.bubbleSort3(_self.arr);
        //   console.timeEnd('正反冒泡排序耗时');
        // }).then(function () {
        //   console.time('选择排序耗时');
        //   _self.selectionSort(_self.arr);
        //   console.timeEnd('选择排序耗时');
        // }).then(function () {
        //   console.time('插入排序耗时');
        //   _self.insertionSort(_self.arr);
        //   console.timeEnd('插入排序耗时');
        // }).then(function () {
        //   console.time('希尔排序耗时');
        //   _self.shellSort(_self.arr);
        //   console.timeEnd('希尔排序耗时');
        // }).then(function () {
        //   console.time('归并排序耗时');
        //   _self.mergeSort(_self.arr);
        //   console.timeEnd('归并排序耗时');
        // }).then(function () {
        //   console.time('快速排序耗时');
        //   _self.quickSort(_self.arr, 0, _self.arr.length - 1);
        //   console.timeEnd('快速排序耗时');
        // }).then(function () {
        //   console.time('堆排序耗时');
        //   _self.heapSort(_self.arr);
        //   console.timeEnd('堆排序耗时');
        // }).then(function () {
        //   console.time('计数排序耗时');
        //   _self.countingSort(_self.arr,_self.arr.length);
        //   console.timeEnd('计数排序耗时');
        // }).then(function () {
        //   console.time('桶排序耗时');
        //   _self.bucketSort(_self.arr);
        //   console.timeEnd('桶排序耗时');
        // }).then(function () {
        //   console.time('基数排序耗时');
        //   _self.radixSort(_self.arr);
        //   console.timeEnd('基数排序耗时');
        // });
      },
      // 冒泡排序1
      bubbleSort(arr) {
        var arr = arr;
        var len = arr.length;
        for (var i = 0; i < len; i++) {
          for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
              var tmp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = tmp;
            }
          }
        }
        return arr;
      },
      // 冒泡排序2
      bubbleSort2(arr) {
        var arr = arr;
        var i = arr.length - 1;
        while (i > 0) {
          var pos = 0;
          for (var j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
              pos = j;
              var tmp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = tmp;
            }
          }
          i = pos;
        }
        return arr;
      },
      // 冒泡排序3
      bubbleSort3(arr) {
        var arr = arr;
        var low = 0;
        var high = arr.length - 1;
        var tmp, j;
        while (low < high) {
          for (j = low; j < high; j++) { //正向冒泡,找到最大者
            if (arr[j] > arr[j + 1]) {
              tmp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = tmp;
            }
          }
          high--;//修改high值, 前移一位
          for (j = high; j > low; j--) { //反向冒泡,找到最小者
            if (arr[j] < arr[j - 1]) {
              tmp = arr[j];
              arr[j] = arr[j - 1];
              arr[j - 1] = tmp;
            }
          }
          low++;//修改low值,后移一位
        }
        return arr;
      },
      //选择排序
      selectionSort(arr) {
        var arr = arr;
        var len = arr.length;
        var minIndex, temp;
        for (var i = 0; i < len - 1; i++) {
          minIndex = i;
          for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     //寻找最小的数
              minIndex = j;                 //将最小数的索引保存
            }
          }
          temp = arr[i];
          arr[i] = arr[minIndex];
          arr[minIndex] = temp;
        }
        return arr;
      },
      //插入排序
      insertionSort(arr) {
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
      //希尔排序
      shellSort(arr) {
        var len = arr.length,
          temp,
          gap = 1;
        while (gap < len / 3) {          //动态定义间隔序列
          gap = gap * 3 + 1;
        }
        for (gap; gap > 0; gap = Math.floor(gap / 3)) {
          for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
              arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
          }
        }
        return arr;
      },
      //归并排序
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
        var result = [];
        while (left.length && right.length) {
          if (left[0] <= right[0]) {
            result.push(left.shift());
          } else {
            result.push(right.shift());
          }
        }
        while (left.length)
          result.push(left.shift());
        while (right.length)
          result.push(right.shift());
        return result;
      },
      //快速排序
      quickSort(arr, left, right) {
        console.log(arr);
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
        var pivot = left,                      //设定基准值（pivot）
          index = pivot + 1;
        for (var i = index; i <= right; i++) {
          if (arr[i] < arr[pivot]) {
            this.swap(arr, i, index);
            index++;
          }
        }
        this.swap(arr, pivot, index - 1);
        return index - 1;
      },
      swap(arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      },
      //堆排序
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
      /*方法说明：维护堆的性质
      @param  arr 数组
      @param  x   数组下标
      @param  len 堆大小*/
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
      //计数排序
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
      //桶排序
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

        arr.length = 0;
        for (i = 0; i < buckets.length; i++) {
          this.insertionSort(buckets[i]);                      //对每个桶进行排序，这里使用了插入排序
          for (var j = 0; j < buckets[i].length; j++) {
            arr.push(buckets[i][j]);
          }
        }

        return arr;
      },
      //基数排序
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
    },
  }
</script>

<style scoped>
  .sortSpeed{
    width: calc(100% - 40px);
    margin:0 auto;
  }
</style>
