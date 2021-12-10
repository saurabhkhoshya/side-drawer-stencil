import { Component, h, Method, Prop, State } from '@stencil/core';

@Component({
  tag: 'app-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  @State() showContactInfo = false;
  /**
   * Title prop
   */
  @Prop() title: string;

  @Prop({ reflect: true, mutable: true }) opened: boolean;

  onCloseDrawer() {
    this.opened = false;
  }

  onContentChange(content: string) {
    this.showContactInfo = content === 'contact';
  }

  @Method()
  open() {
    this.opened = true;
  }

  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-information">
          <h2>Contact Information</h2>
          <p>You can reach us via phone or email</p>
          <ul>
            <li>Phone: 1234555</li>
            <li>
              Email: <a href="mailto:saurabhkhoshya@gmail.com">saurabhkhoshya@gmail.com</a>
            </li>
          </ul>
        </div>
      );
    }

    return [
      <div class="backdrop" onClick={this.onCloseDrawer.bind(this)}></div>,
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>
        <section id="tabs">
          <button class={!this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this, 'nav')}>
            Navigation
          </button>
          <button class={this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this, 'contact')}>
            Contact
          </button>
        </section>
        <main>{mainContent}</main>
      </aside>,
    ];
  }
}
