import { InputType, Field } from '@nestjs/graphql';
import {
  Buttons,
  Cards,
  ColorPallete,
  Footer,
  Logo,
  Navigation,
  ThemeBackground,
  ThemeSectionEntity,
  ThemeTypography,
  Animation,
} from '../entities/theme-configuration.entity';
import { ThemeSection } from '../../theme-section';

@InputType()
export class CreateThemeConfigurationInput {
  @Field()
  title: string;

  @Field(() => ColorPallete, { nullable: true })
  colorPallete: ColorPallete;

  @Field(() => ThemeTypography, { nullable: true })
  typography: ThemeTypography;

  @Field(() => Logo, { nullable: true })
  logo: Logo;

  @Field(() => Navigation, { nullable: true })
  navigation: Navigation;

  @Field(() => Footer, { nullable: true })
  footer: Footer;

  @Field(() => Buttons, { nullable: true })
  buttons: Buttons;

  @Field(() => Cards, { nullable: true })
  cards: Cards;

  @Field(() => ThemeBackground, { nullable: true })
  background: ThemeBackground;

  @Field(() => [ThemeSectionEntity], { nullable: true })
  sections: ThemeSection[] = [];

  @Field(() => Animation, { nullable: true })
  animation: Animation;
}
