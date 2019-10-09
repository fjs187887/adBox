import MessageViewer, {
  MsgTypes } from './display-components'
export default {
  toAvatar (session, self) {
    let members = session.members
    if (session.type === 2) {
      return members.slice(0, 4).map(item => item.avatar)
    }
    for (let i = 0; i < members.length; i++) {
      let member = members[i]
      if (session.type === 1) {
        if (member.uid !== self) {
          return member.avatar
        }
      } else if (session.type === 3) {
        if (member.uid === session.uid) {
          return member.avatar
        }
      }
    }
    return ''
  },
  toText (messages, members) {
    if (messages.length) {
      let msg = messages[0]
      if (MsgTypes[msg.type]) {
        let text = MessageViewer[MsgTypes[msg.type]].methods.toString(msg.content)
        for (let i = 0; i < members.length; i++) {
          if (members[i].uid === msg.uid) {
            return `${members[i].talk_nickname || members[i].nickname}:${text}`
          }
        }
        return text
      }
    }
    return ''
  },
  toName (session, self) {
    switch (session.type) {
      case 1:
        for (let i = 0; i < session.members.length; i++) {
          if (session.members[i].uid !== self) {
            return session.members[i].talk_nickname || session.members[i].nickname
          }
        }
        break
      case 2:
        let names = []
        for (let i = 0; i < session.members.length && i < 4; i++) {
          names.push(session.members[i].talk_nickname || session.members[i].nickname)
        }
        return `群聊(${names.map(name => name.replace(/^([\s\S]{5})[\s\S]+$/, '$1...')).join(',')})`
      case 3:
        for (let i = 0; i < session.members.length; i++) {
          if (session.members[i].uid === session.uid) {
            return session.members[i].talk_nickname || session.members[i].nickname
          }
        }
    }
    return ''
  }
}
