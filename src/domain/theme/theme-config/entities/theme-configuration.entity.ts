import {
  ObjectType,
  Field,
  registerEnumType,
  InputType,
} from '@nestjs/graphql';
import { ThemeSection } from '../../theme-section';

@ObjectType()
@InputType('ButtonsInput')
export class Buttons {
  @Field()
  borderRadius: string;

  @Field(() => ButtonType)
  buttonType: ButtonType;

  @Field(() => ButtonSize)
  buttonSize: ButtonSize;

  @Field()
  buttonHover: boolean;
}

@ObjectType()
@InputType('CardsInput')
export class Cards {
  @Field()
  backgroundColor: string;

  @Field()
  borderRadius: string;
}

@ObjectType()
@InputType('PropsInput')
export class Props {
  @Field({ nullable: true })
  className: string;

  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  onClick: string;

  @Field({ nullable: true })
  src: string;

  @Field({ nullable: true })
  alt: string;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  value: string;

  @Field({ nullable: true })
  placeholder: string;

  @Field({ nullable: true })
  name: string;
}

@ObjectType()
@InputType('StyleInput')
export class Style {
  @Field({ nullable: true })
  padding: string;

  @Field({ nullable: true })
  margin: string;

  @Field({ nullable: true })
  color: string;

  @Field({ nullable: true })
  backgroundColor: string;

  @Field({ nullable: true })
  background: string;

  @Field({ nullable: true })
  border: string;

  @Field({ nullable: true })
  borderRadius: string;

  @Field({ nullable: true })
  fontSize: string;

  @Field({ nullable: true })
  fontWeight: string;

  @Field({ nullable: true })
  textAlign: string;

  @Field({ nullable: true })
  display: string;

  @Field({ nullable: true })
  flexDirection: string;

  @Field({ nullable: true })
  justifyContent: string;

  @Field({ nullable: true })
  alignItems: string;

  @Field({ nullable: true })
  flexWrap: string;

  @Field({ nullable: true })
  flex: string;

  @Field({ nullable: true })
  width: string;

  @Field({ nullable: true })
  height: string;

  @Field({ nullable: true })
  position: string;

  @Field({ nullable: true })
  top: string;

  @Field({ nullable: true })
  right: string;

  @Field({ nullable: true })
  bottom: string;

  @Field({ nullable: true })
  left: string;

  @Field({ nullable: true })
  zIndex: string;

  @Field({ nullable: true })
  boxShadow: string;

  @Field({ nullable: true })
  overflow: string;

  @Field({ nullable: true })
  transform: string;
}

@ObjectType()
@InputType('AnimationInput')
export class Animation {
  @Field()
  duration: string;

  @Field()
  timing: string;

  @Field()
  delay: string;

  @Field()
  iteration: string;

  @Field()
  type: string;
}

@ObjectType()
@InputType('ThemeBackgroundInput')
export class ThemeBackground {
  @Field()
  color: string;

  @Field()
  image: string;
}

@ObjectType()
@InputType('ColorPalleteInput')
export class ColorPallete {
  @Field()
  primary: string;

  @Field()
  secondary: string;

  @Field()
  tertiary: string;

  @Field()
  text: string;

  @Field()
  headers: string;

  @Field()
  background: string;

  @Field()
  surface: string;

  @Field()
  cards: string;
}

@ObjectType()
@InputType('NavigationInput')
export class Navigation {
  @Field(() => NavigationLayout)
  layout: NavigationLayout;

  @Field()
  backgroundColor: string;

  @Field()
  navigationLinksColors: string;

  @Field()
  fontSize: string;

  @Field()
  fontWeight: string;
}

@ObjectType()
@InputType('LogoInput')
export class Logo {
  @Field()
  url: string;
}

@ObjectType()
@InputType('FooterInput')
export class Footer {
  @Field(() => FooterLayout)
  layout: FooterLayout;

  @Field()
  backgroundColor: string;

  @Field()
  color: string;

  @Field()
  fontSize: string;

  @Field()
  fontWeight: string;
}

@ObjectType()
@InputType('TextInput')
export class Text {
  @Field({ nullable: true })
  fontSize: string;

  @Field({ nullable: true })
  fontFamily: string;

  @Field({ nullable: true })
  color: string;

  @Field({ nullable: true })
  weight: string;
}

@ObjectType()
@InputType('ThemeTypographyInput')
export class ThemeTypography {
  @Field(() => TypographySize)
  fontSize: TypographySize;

  @Field()
  headers: Text;

  @Field()
  text: Text;
}

@ObjectType()
export class ThemeConfigurationEntity {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field(() => ColorPallete)
  colorPallete: ColorPallete;

  @Field(() => ThemeTypography)
  typography: ThemeTypography;

  @Field(() => Logo)
  logo: Logo;

  @Field(() => Navigation)
  navigation: Navigation;

  @Field(() => Footer)
  footer: Footer;

  @Field(() => Buttons)
  buttons: Buttons;

  @Field(() => Cards)
  cards: Cards;

  @Field(() => ThemeBackground)
  background: ThemeBackground;

  @Field(() => [ThemeSectionEntity])
  sections: ThemeSection[] = [];

  @Field(() => Animation)
  animation: Animation;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  tenantId: string;

  @Field(() => [WebsitePage], { nullable: true })
  activePages: WebsitePage[];
}

export enum TypographySize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export enum NavigationLayout {
  SPACE_BETWEEN = 'SPACE_BETWEEN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  CENTER = 'CENTER',
  STACKED = 'STACKED',
}

export enum FooterLayout {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
}

export enum ComponentType {
  DIV = 'DIV',
  BUTTON = 'BUTTON',
  INPUT = 'INPUT',
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  LOGO = 'LOGO',
  NAVIGATION = 'NAVIGATION',
  FOOTER = 'FOOTER',
  SECTION = 'SECTION',
  SECTION_TITLE = 'SECTION_TITLE',
  CARD = 'CARD',
  MODAL = 'MODAL',
  TOAST = 'TOAST',
  LOADER = 'LOADER',
  FORM = 'FORM',
  TABLE = 'TABLE',
  LIST = 'LIST',
  GRID = 'GRID',
  MAP = 'MAP',
  CHART = 'CHART',
  CALENDAR = 'CALENDAR',
  TIMER = 'TIMER',
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  H4 = 'H4',
  H5 = 'H5',
  H6 = 'H6',
  P = 'P',
  SPAN = 'SPAN',
  LINK = 'LINK',
  ICON = 'ICON',
  SVG = 'SVG',
  VIDEO = 'VIDEO',
}

export enum ButtonType {
  FILLED = 'FILLED',
  OUTLINED = 'OUTLINED',
  TEXT = 'TEXT',
}

export enum ButtonSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export enum WebsitePage {
  HOME = "home",
  ABOUT = "about",
  CONTACT = "contact",
  MENU = "menu",
  ORDER = "order",
  RESERVATIONS = "reservations",
  EVENTS = "events",
  GALLERY = "gallery",
  BLOG = "blog",
  CAREERS = "careers",
  PRIVACY = "privacy",
  TERMS = "terms",
}

registerEnumType(WebsitePage, {
  name: 'SectionPage',
});

registerEnumType(ButtonType, {
  name: 'ButtonType',
});

registerEnumType(ButtonSize, {
  name: 'ButtonSize',
});

registerEnumType(TypographySize, {
  name: 'TypographySize',
});

registerEnumType(NavigationLayout, {
  name: 'NavigationLayout',
});

registerEnumType(FooterLayout, {
  name: 'FooterLayout',
});

registerEnumType(ComponentType, {
  name: 'ComponentType',
});

@ObjectType()
@InputType('ThemeSectionComponentInput')
export class ThemeSectionComponent {
  @Field(() => ComponentType)
  type: ComponentType;

  @Field()
  title: string;

  @Field(() => Style, { nullable: true })
  style: Style;

  @Field(() => Props, { nullable: true })
  props: Props;
}

@ObjectType()
@InputType('ThemeSectionEntityInput')
export class ThemeSectionEntity {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Style, { nullable: true })
  style: Style;

  @Field(() => Props, { nullable: true })
  props: Props;

  @Field({ nullable: true })
  page: string;

  @Field(() => [ThemeSectionComponent], { nullable: true })
  components: ThemeSectionComponent[] = [];
}
