namespace SpriteKind {
    export const Good = SpriteKind.create()
    export const Title = SpriteKind.create()
    export const Ultragood = SpriteKind.create()
    export const Basement = SpriteKind.create()
}
namespace StatusBarKind {
    export const heal = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ultragood, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(Ultra_Heal, effects.disintegrate, 500)
    Heal_Bar.value += 25
    music.play(music.createSoundEffect(WaveShape.Sawtooth, 1965, 1965, 178, 14, 259, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
    animation.runImageAnimation(
    mySprite,
    assets.animation`Heal`,
    100,
    false
    )
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (purp == 0) {
        animation.runImageAnimation(
        mySprite,
        assets.animation`Heal0`,
        100,
        false
        )
        Heal_Bar.value += -10
        statusbar.value += 5
        music.play(music.createSoundEffect(
        WaveShape.Sawtooth,
        1500,
        1910,
        255,
        0,
        50,
        SoundExpressionEffect.None,
        InterpolationCurve.Linear
        ), music.PlaybackMode.UntilDone)
        music.play(music.createSoundEffect(
        WaveShape.Sawtooth,
        1500,
        3003,
        255,
        0,
        100,
        SoundExpressionEffect.None,
        InterpolationCurve.Linear
        ), music.PlaybackMode.UntilDone)
    }
    if (purp == 1) {
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1500, 1910, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1500, 1910, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Basement, function (sprite, otherSprite) {
    statusbar.value += -8
    music.play(music.createSoundEffect(WaveShape.Noise, 639, 682, 214, 13, 252, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    scene.cameraShake(8, 100)
})
statusbars.onStatusReached(StatusBarKind.heal, statusbars.StatusComparison.GT, statusbars.ComparisonType.Percentage, 0, function (status) {
    purp = 0
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Good, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(Collectable, effects.disintegrate, 500)
    statusbar.value += 25
    music.play(music.createSoundEffect(WaveShape.Triangle, 5000, 5000, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    animation.runImageAnimation(
    mySprite,
    assets.animation`GreenCollete`,
    100,
    false
    )
})
statusbars.onStatusReached(StatusBarKind.heal, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Percentage, 0, function (status) {
    purp = 1
    Heal_Bar.value = 0
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbar.value += -0.5
    Kill.sayText("Bye.")
    animation.runImageAnimation(
    Kill,
    assets.animation`Yarrrrrr`,
    100,
    false
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbar.value += -2
    music.play(music.createSoundEffect(WaveShape.Noise, 1360, 1404, 255, 77, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    scene.cameraShake(5, 100)
    mySprite.startEffect(effects.disintegrate, 100)
    animation.runImageAnimation(
    Kill,
    assets.animation`Yarrrrrr`,
    100,
    false
    )
    animation.runImageAnimation(
    mySprite,
    assets.animation`Hurt`,
    50,
    false
    )
})
let Kill: Sprite = null
let Collectable: Sprite = null
let Ultra_Heal: Sprite = null
let Heal_Bar: StatusBarSprite = null
let mySprite: Sprite = null
let statusbar: StatusBarSprite = null
let purp = 0
let Title2 = sprites.create(assets.image`Title Screen`, SpriteKind.Title)
pause(2000)
purp = 0
game.setDialogCursor(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 1 1 1 1 1 1 1 1 . . . . 
    . . . 1 f f f f f f f f 1 . . . 
    . . 1 f f f f 1 f f f f f 1 . . 
    . . 1 f f f 1 f 1 f f f f 1 . . 
    . . 1 f f 1 f f f 1 f f f 1 . . 
    . . 1 f f 1 f f f 1 f f f 1 . . 
    . . 1 f f 1 1 1 1 1 f f f 1 . . 
    . . 1 f f 1 f f f 1 f f f 1 . . 
    . . 1 f f 1 f f f 1 f f f 1 . . 
    . . 1 f f f f f f f f f f 1 . . 
    . . . 1 f f f f f f f f 1 . . . 
    . . . . 1 1 1 1 1 1 1 1 . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `)
game.splash("How To Play.")
game.splash("Green Heals you,", "Red Hurts you.")
game.splash("Purple refills your", "heal bar.")
game.splash("That bar under you", "is your health.")
game.splash("The other bar under you", "is your heal bar. ")
game.splash("Be Careful.", "")
game.splash("Can you beat the record?", "(178)")
game.splash("Record set by", "Jonathan Bernardino")
sprites.destroy(Title2, effects.none, 1)
scene.setBackgroundImage(assets.image`BG`)
scroller.scrollBackgroundWithSpeed(-50, -50)
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
mySprite = sprites.create(assets.image`Player`, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
statusbar.attachToSprite(mySprite, -25, 0)
statusbar.setBarBorder(1, 15)
statusbar.setColor(1, 9, 8)
statusbar.value = 200
Heal_Bar = statusbars.create(20, 4, StatusBarKind.heal)
Heal_Bar.attachToSprite(mySprite, -22, 0)
Heal_Bar.setBarBorder(1, 15)
Heal_Bar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
Heal_Bar.setColor(10, 11, 12)
game.onUpdateInterval(5000, function () {
    Collectable = sprites.createProjectileFromSide(assets.image`Collect`, 0, 50)
    Collectable.x = randint(5, 155)
    Collectable.setKind(SpriteKind.Good)
})
game.onUpdateInterval(250, function () {
    Kill = sprites.createProjectileFromSide(assets.image`Ememy`, 0, 50)
    Kill.x = randint(5, 155)
    Kill.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(10000, function () {
    Ultra_Heal = sprites.createProjectileFromSide(assets.image`Heal`, 0, 50)
    Ultra_Heal.x = randint(5, 155)
    Ultra_Heal.setKind(SpriteKind.Ultragood)
})
