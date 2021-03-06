import Settings from "../static/settings";
import Logger from "../utilities/logger";

const logger: Logger = new Logger('pause');
export default class PauseScene extends Phaser.Scene {

    constructor() {
        super({ key: Settings.pauseScene });
    }

    public create() {
        this.addBackground();
        this.addTitle();
        this.addButtons();
    }

    private addBackground() {
        const background = this.add.graphics();
        background.fillStyle(0xeeeeee, 1);
        background.fillRect(Settings.gameWidth * 0.25, Settings.gameHeight * 0.25, Settings.gameWidth * 0.5, Settings.gameHeight * 0.5);
    }

    private addButtons() {
        const resumeButton = this.add.image(Settings.gameWidth * 0.5, 0, 'play');
        this.tweens.add({
            targets: resumeButton,
            x: Settings.gameWidth * 0.5,
            y: Settings.gameHeight * 0.5,
            duration: 200,
            ease: 'Quad.easeIn',
            onComplete: () => {
                resumeButton.setInteractive();
                resumeButton.on('pointerup', this.onResumeButtonClicked, this);
            }
        });
    }

    private addTitle() {
        const title = this.add.text(Settings.gameWidth * 0.5, Settings.gameHeight * 0.25 + 80, Settings.pauseScene, Settings.textTitleStyle);
        title.setOrigin(0.5, 0.5);
    }

    private onResumeButtonClicked(pointer: Phaser.Input.Pointer) {
        this.scene.resume(Settings.gameScene);
        this.scene.setVisible(false);
    }
}