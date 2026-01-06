import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Header } from "../core/components/header";
import { Footer } from "../core/components/footer";


@Component({
    selector: "app-main-layout",
    imports: [RouterOutlet, Header, Footer],
    template: `
    <app-header />
    <router-outlet />
    <app-footer />
    `,
})
export class MainLayout {

}