var t1 = new Terminal()
t1.setHeight("400px")
t1.setWidth('1200px')
document.body.appendChild(t1.html)

var song = document.createElement('audio')
song.innerHTML = '<source src="MI.mp3" type="audio/mpeg">'
song.volume = 0.1
var myPlay = function() {
  song.load()
  song.play()
}

var goodbye = function() {
    t1.sleep(1000, function() {
    t1.print('PLEASE LOCATE THE SECRET PASSWORD...')
    t1.sleep(2000, function() {
    t1.print('GOODBYE')
    t1.sleep(2000, function(){
    close()})
    })
    })
}

var congrats = function() {
    var docs = document.getElementById("img");
    docs.setAttribute("src", "https://media.giphy.com/media/ehhuGD0nByYxO/giphy.gif");
    docs.style.display = 'block';
    t1.sleep(3000, function(){
        t1.print('  ')
        t1.print('  ')
        docs.style.display = 'none'
        t1.sleep(2000, function(){
            t1.print('THE TREASURE...')
            t1.print('  ')
            t1.sleep(2000, function() {
                t1.print('IS IN...')
                t1.print('  ')
                t1.sleep(2000, function() {
                    t1.print('THE BACKPACK!')
                })
            })
        })
    })
}

var sad = function() {
    var docs = document.getElementById("img")
    docs.setAttribute("src", "https://media.giphy.com/media/PW24kUmUv3vlm/giphy.gif")
    docs.style.display = 'block'
    t1.beep()
    t1.sleep(2000, function() {
        docs.style.display = 'none'
    })
}

var check_password = function () {
    t1.password('PLEASE ENTER THE PASSWORD:', function(p) {
        if (p === 'TREASURE') {
            congrats()
        } else {
            t1.print('INCORRECT')
            sad()
            check_password()
        }
    })
}

t1.print('HELLO...')
t1.sleep(3000, function(){
    t1.confirm('ARE YOU PREPARED TO ENTER THE SECRET PASSWORD...', function(didConfirm) {
        if(didConfirm) {
            myPlay()
            t1.sleep(1000, function() {
                t1.print('GREAT!')
                check_password()
            })
        } else {
            goodbye()
        }
    })
})
