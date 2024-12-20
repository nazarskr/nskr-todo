import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly DARK_THEME_CLASS = 'dark-theme';
  private readonly THEME_STORAGE_KEY = 'isDarkMode';
  private isDarkMode!: boolean;

  constructor() {
    this.isDarkMode = this.loadThemeFromLocalStorage();
    this.applyTheme(this.isDarkMode);
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme(this.isDarkMode);
    this.saveThemeToLocalStorage(this.isDarkMode);
  }

  setTheme(isDarkMode: boolean): void {
    this.isDarkMode = isDarkMode;
    this.applyTheme(this.isDarkMode);
    this.saveThemeToLocalStorage(this.isDarkMode);
  }

  get currentTheme(): boolean {
    return this.isDarkMode;
  }

  private applyTheme(isDarkMode: boolean): void {
    if (isDarkMode) {
      document.body.classList.add(this.DARK_THEME_CLASS);
    } else {
      document.body.classList.remove(this.DARK_THEME_CLASS);
    }
  }

  private saveThemeToLocalStorage(isDarkMode: boolean): void {
    localStorage.setItem(this.THEME_STORAGE_KEY, JSON.stringify(isDarkMode));
  }

  private loadThemeFromLocalStorage(): boolean {
    const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY);
    return savedTheme !== null ? JSON.parse(savedTheme) : false;
  }
}
