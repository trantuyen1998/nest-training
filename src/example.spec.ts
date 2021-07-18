class FriendsList {
  friends = []
  addFriend(name) {
    this.friends.push(name)
    this.announceFriendShip(name)
  }

  announceFriendShip(name) {
    global.console.log(`${name} is a friend`)
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name)

    if (idx === -1) {
      throw new Error('Friend not found!')
    }

    this.friends.slice(idx, 1)
  }
}

describe('FriendsList', () => {
  let friendsList
  beforeEach(() => {
    friendsList = new FriendsList()
  })
  it('intializes friends list', () => {
    expect(friendsList.friends.length).toEqual(0)
  })
  it('add friend to list', () => {
    friendsList.addFriend('tuyen')
    expect(friendsList.friends.length).toEqual(1)
  })
  it('announce friendship', () => {
    friendsList.announceFriendShip = jest.fn() //check num call
    expect(friendsList.announceFriendShip).not.toHaveBeenCalled()
    friendsList.addFriend('tuyen')
    expect(friendsList.announceFriendShip).toHaveBeenCalledWith('tuyen')
    expect(friendsList.friends.length).toEqual(1)
  })

  describe('removeFriend', () => {
    it('removes a friend from the list', () => {
      friendsList.addFriend('hai')
      expect(friendsList.friends[0]).toEqual('hai')
      friendsList.removeFriend('hai')
      //  expect(friendsList.friends[0]).toBeUndefined()
    })
    it('throw exception as friend dose not exists', () => {
      expect(() => friendsList.removeFriend('tuyen')).toThrow()
    })
  })
})
