import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DragDropModule } from 'primeng/dragdrop';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { DndModule } from 'ngx-drag-drop';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

import { EqpFilterComponent } from './components/eqp-filter/eqp-filter.component';
import { TabmenuComponent } from './components/tabmenu/tabmenu.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        SidebarComponent,
        EqpFilterComponent,
        TabmenuComponent,
        ToolbarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        AutoCompleteModule,
        ButtonModule,
        BreadcrumbModule,
        CalendarModule,
        CardModule,
        CascadeSelectModule,
        CheckboxModule,
        ConfirmDialogModule,
        DragDropModule,
        DialogModule,
        DividerModule,
        DropdownModule,
        DynamicDialogModule,
        ListboxModule,
        InputTextModule,
        MenubarModule,
        MessagesModule,
        PanelModule,
        PanelMenuModule,
        RadioButtonModule,
        SelectButtonModule,
        SplitterModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TagModule,
        ToastModule,
        ToolbarModule,
        DndModule,
        FontAwesomeModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        AutoCompleteModule,
        ButtonModule,
        BreadcrumbModule,
        CalendarModule,
        CardModule,
        CascadeSelectModule,
        CheckboxModule,
        ConfirmDialogModule,
        DragDropModule,
        DialogModule,
        DividerModule,
        DropdownModule,
        DynamicDialogModule,
        ListboxModule,
        InputTextModule,
        MenubarModule,
        MessagesModule,
        PanelModule,
        PanelMenuModule,
        RadioButtonModule,
        SelectButtonModule,
        SplitterModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TagModule,
        ToastModule,
        ToolbarModule,
        DndModule,
        FontAwesomeModule,
        FooterComponent,
        HeaderComponent,
        SidebarComponent,
        EqpFilterComponent,
        TabmenuComponent,
        ToolbarComponent
    ]
})

export class UiModule { }
