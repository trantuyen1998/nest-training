class FriendsList {
  friends = []
  addFriend(name) {
    this.friends.push(name)
    this.announceFriendShip(name)
  }

  announceFriendShip(name) {
    global.console.log(`${name} is a friend`)
  }
}

describe('FriendsList', () => {
  it('intializes friends list', () => {
    const friendsList = new FriendsList()
    expect(friendsList.friends.length).toEqual(0)
  })
  it('add friend to list', () => {
    const friendsList = new FriendsList()
    friendsList.addFriend('tuyen')
    expect(friendsList.friends.length).toEqual(1)
  })
  it('announce friendship', () => {
    const friendsList = new FriendsList()
    friendsList.announceFriendShip = jest.fn() //check num call
    expect(friendsList.announceFriendShip).not.toHaveBeenCalled()
    friendsList.addFriend('tuyen')
    expect(friendsList.announceFriendShip).toHaveBeenCalledWith('tuyen')
    expect(friendsList.friends.length).toEqual(1)
  })
})
