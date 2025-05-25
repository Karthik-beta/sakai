import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    providers: [MessageService],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" class="mb-8 w-16 shrink-0 mx-auto" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                                </g>
                                <g id="SVGRepo_iconCarrier">
                                <path style="fill:#2D527C;" d="M219.378,235.587H31.792C14.261,235.587,0,221.326,0,203.796V32.784 C0,15.254,14.261,0.992,31.792,0.992h171.014c17.53,0,31.792,14.261,31.792,31.792v116.18c0,8.405-6.813,15.219-15.219,15.219 c-8.405,0-15.219-6.813-15.219-15.219V32.784c0-0.747-0.607-1.354-1.354-1.354H31.792c-0.747,0-1.354,0.607-1.354,1.354v171.014 c0,0.747,0.607,1.354,1.354,1.354h187.587c8.405,0,15.219,6.813,15.219,15.219C234.597,228.776,227.783,235.587,219.378,235.587z"></path> <rect x="76.093" y="77.085" style="fill:#CEE8FA;" width="82.408" height="82.408"></rect> <path style="fill:#2D527C;" d="M158.504,174.713H76.093c-8.405,0-15.219-6.813-15.219-15.219v-82.41 c0-8.405,6.813-15.219,15.219-15.219h82.411c8.405,0,15.219,6.813,15.219,15.219v82.41 C173.723,167.9,166.909,174.713,158.504,174.713z M91.311,144.276h51.974V92.303H91.311V144.276z"></path> <path style="fill:#CEE8FA;" d="M480.208,220.369H309.195c-9.152,0-16.573-7.421-16.573-16.573V32.784 c0-9.152,7.421-16.573,16.573-16.573h171.014c9.152,0,16.573,7.421,16.573,16.573v171.014 C496.781,212.95,489.361,220.369,480.208,220.369z"></path> <path style="fill:#2D527C;" d="M480.208,235.587H309.195c-17.53,0-31.792-14.261-31.792-31.792V32.784 c0-17.53,14.261-31.792,31.792-31.792h171.014c17.53,0,31.792,14.261,31.792,31.792v171.014 C512,221.326,497.739,235.587,480.208,235.587z M309.195,31.429c-0.747,0-1.354,0.607-1.354,1.354v171.014 c0,0.747,0.607,1.354,1.354,1.354h171.014c0.747,0,1.354-0.607,1.354-1.354V32.784c0-0.747-0.607-1.354-1.354-1.354H309.195z"></path> <path style="fill:#CEE8FA;" d="M202.805,495.789H31.792c-9.152,0-16.573-7.421-16.573-16.573V308.203 c0-9.152,7.421-16.573,16.573-16.573h171.014c9.152,0,16.573,7.421,16.573,16.573v171.014 C219.378,488.369,211.958,495.789,202.805,495.789z"></path> <g> <path style="fill:#2D527C;" d="M202.805,511.008H31.792C14.261,511.008,0,496.746,0,479.216V308.203 c0-17.53,14.261-31.792,31.792-31.792h171.014c17.53,0,31.792,14.261,31.792,31.792v171.014 C234.597,496.746,220.335,511.008,202.805,511.008z M31.792,306.848c-0.747,0-1.354,0.607-1.354,1.354v171.014 c0,0.747,0.607,1.354,1.354,1.354h171.014c0.747,0,1.354-0.607,1.354-1.354V308.203c0-0.747-0.607-1.354-1.354-1.354H31.792z"></path> <path style="fill:#2D527C;" d="M496.781,511.008H309.195c-17.53,0-31.792-14.261-31.792-31.791V308.203 c0-17.53,14.261-31.792,31.792-31.792h171.014c17.53,0,31.792,14.261,31.792,31.792v115.708c0,8.405-6.813,15.219-15.219,15.219 c-8.405,0-15.219-6.813-15.219-15.219V308.203c0-0.747-0.607-1.354-1.354-1.354H309.195c-0.747,0-1.354,0.607-1.354,1.354v171.014 c0,0.747,0.607,1.354,1.354,1.354h187.587c8.405,0,15.219,6.813,15.219,15.219S505.187,511.008,496.781,511.008z"></path> </g> <rect x="353.496" y="352.507" style="fill:#CEE8FA;" width="82.408" height="82.408"></rect> <path style="fill:#2D527C;" d="M435.907,450.134h-82.411c-8.405,0-15.219-6.813-15.219-15.219v-82.41 c0-8.405,6.813-15.219,15.219-15.219h82.411c8.405,0,15.219,6.813,15.219,15.219v82.41 C451.126,443.32,444.313,450.134,435.907,450.134z M368.715,419.697h51.974v-51.973h-51.974V419.697z"></path>
                                </g>
                            </svg>
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to PivotrHR</div>
                            <span class="text-muted-color font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label for="username" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Username</label>
                            <input pInputText id="username" type="text" placeholder="Username" class="w-full md:w-[30rem] mb-8" [(ngModel)]="username" />

                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <p-password id="password1" [(ngModel)]="password" placeholder="Password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>

                            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                <div class="flex items-center">
                                    <p-checkbox [(ngModel)]="checked" id="rememberme1" binary class="mr-2"></p-checkbox>
                                    <label for="rememberme1">Remember me</label>
                                </div>
                                <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
                            </div>
                            <p-button label="Sign In" (click)="navigateIfMatch()" styleClass="w-full"></p-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Login {

    constructor(
        private messageService: MessageService,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.loadCredentials();
    }

    username: string = '';

    password: string = '';

    checked: boolean = false;

    private encryptionKey: string = '80lsdsdvfYUY1VFWesdfs%4576dFHVYAvsrBTPmPKQw453#zpHf3';

    navigateIfMatch(): void {
        if (this.authService.login(this.username, this.password)) {
            if (this.checked) {
                this.saveCredentials();
            } else {
                this.clearCredentials();
            }
            this.router.navigate(['/']);
            console
        }
        else {
            console.log('Login failed');
            this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid username or password' });
        }
    }

    async saveCredentials(): Promise<void> {
        const key = await this.generateKey();
        const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization vector

        // Encrypt username
        const usernameEncrypted = await this.encryptData(this.username, key, iv);
        localStorage.setItem('username', JSON.stringify({ iv: Array.from(iv), data: usernameEncrypted }));

        // Encrypt password
        const passwordEncrypted = await this.encryptData(this.password, key, iv);
        localStorage.setItem('password', JSON.stringify({ iv: Array.from(iv), data: passwordEncrypted }));
    }

    async loadCredentials(): Promise<void> {
        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');

        if (savedUsername && savedPassword) {
            try {
                const key = await this.generateKey();

                // Parse and validate username data
                const usernameData = JSON.parse(savedUsername);
                if (!usernameData.iv || !usernameData.data) {
                    throw new Error('Invalid username data format');
                }
                const usernameIv = new Uint8Array(usernameData.iv);
                this.username = await this.decryptData(usernameData.data, key, usernameIv);

                // Parse and validate password data
                const passwordData = JSON.parse(savedPassword);
                if (!passwordData.iv || !passwordData.data) {
                    throw new Error('Invalid password data format');
                }
                const passwordIv = new Uint8Array(passwordData.iv);
                this.password = await this.decryptData(passwordData.data, key, passwordIv);

                this.checked = true;
            } catch (error) {
                console.error('Failed to load credentials:', error);
                this.clearCredentials(); // Clear corrupted data
            }
        }
    }

    clearCredentials(): void {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    }

    async generateKey(): Promise<CryptoKey> {
        // Ensure the key is 32 bytes (256 bits) by hashing or padding
        const keyMaterial = new TextEncoder().encode(this.encryptionKey.padEnd(32, '0').slice(0, 32));
        return crypto.subtle.importKey(
            'raw',
            keyMaterial,
            { name: 'AES-GCM' },
            false,
            ['encrypt', 'decrypt']
        );
    }

    async encryptData(data: string, key: CryptoKey, iv: Uint8Array): Promise<string> {
        const encodedData = new TextEncoder().encode(data);
        const encryptedData = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            encodedData
        );
        return btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
    }

    async decryptData(encryptedData: string, key: CryptoKey, iv: Uint8Array): Promise<string> {
        const encryptedBytes = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
        const decryptedData = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            key,
            encryptedBytes
        );
        return new TextDecoder().decode(decryptedData);
    }
}
