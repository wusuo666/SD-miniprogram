import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import WarmTip from '../../components/WarmTip'
import './index.scss'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <Text>Hello world!</Text>
      <WarmTip text="欢迎来到小程序" />
    </View>
  )
}
