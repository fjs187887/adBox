import Mtxt from './txt'
import MImage from './image'
import MVoice from './voice'
import MVideo from './video'
import MGoods from './goods'
import MTask from './task'

export const DefaultType = '1'
export const MsgTypes = {
  '1': 'Mtxt',
  '2': 'MImage',
  '3': 'MVoice',
  '4': 'MVideo',
  '5': 'MGoods',
  '6': 'MTask'
}
export default { Mtxt, MImage, MVoice, MVideo, MGoods, MTask }
