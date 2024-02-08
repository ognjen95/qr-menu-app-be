import { CreateThemeConfigurationInput } from './theme-config/dto/create-theme-configuration.input';
import {
  ComponentType,
  FooterLayout,
  NavigationLayout,
  ThemeConfigurationEntity,
  TypographySize,
} from './theme-config/entities/theme-configuration.entity';

export class ThemeConfig extends ThemeConfigurationEntity {
  constructor() {
    super();
  }

  generateThemeConfig(dto: CreateThemeConfigurationInput) {
    this.title = dto?.title ?? '';
    this.colorPallete = {
      primary: dto?.colorPallete?.primary ?? '',
      secondary: dto?.colorPallete?.secondary ?? '',
      tertiary: dto?.colorPallete?.tertiary ?? '',
      cards: dto?.colorPallete?.cards ?? '',
      background: dto?.colorPallete?.background ?? '',
      surface: dto?.colorPallete?.surface ?? '',
      text: dto?.colorPallete?.text ?? '',
      headers: dto?.colorPallete?.headers ?? '',
    };
    this.typography = {
      fontSize: dto?.typography?.fontSize ?? TypographySize.MEDIUM,
      headers: {
        fontFamily: dto?.typography?.headers?.fontFamily ?? '',
        weight: dto?.typography?.headers?.weight ?? '',
        color: dto?.typography?.headers?.color ?? '',
        fontSize: dto?.typography?.headers?.fontSize ?? '',
      },
      text: {
        fontFamily: dto?.typography?.text?.fontFamily ?? '',
        weight: dto?.typography?.text?.weight ?? '',
        color: dto?.typography?.text?.color ?? '',
        fontSize: dto?.typography?.text?.fontSize ?? '',
      },
    };
    this.logo = {
      url: dto?.logo?.url ?? '',
    };
    this.navigation = {
      layout: dto?.navigation?.layout ?? NavigationLayout.SPACE_BETWEEN,
      backgroundColor: dto?.navigation?.backgroundColor ?? '',
      fontSize: dto?.navigation?.fontSize ?? '',
      fontWeight: dto?.navigation?.fontWeight ?? '',
      navigationLinksColors: dto?.navigation?.navigationLinksColors ?? '',
    };
    this.footer = {
      layout: dto?.footer?.layout ?? FooterLayout.HORIZONTAL,
      backgroundColor: dto?.footer?.backgroundColor ?? '',
      fontSize: dto?.footer?.fontSize ?? '',
      fontWeight: dto?.footer?.fontWeight ?? '',
      color: dto?.footer?.color ?? '',
    };
    this.buttons = {
      borderRadius: dto?.buttons?.borderRadius ?? '',
    };
    this.cards = {
      borderRadius: dto?.cards?.borderRadius ?? '',
      backgroundColor: dto?.cards?.backgroundColor ?? '',
    };
    this.background = {
      color: dto?.background?.color ?? '',
      image: dto?.background?.image ?? '',
    };
    this.sections = dto?.sections?.map((section) => ({
      title: section?.title ?? '',
      description: section?.description ?? '',
      style: section?.style,
      props: section?.props,
      components: section?.components?.map((component) => ({
        title: component?.title ?? '',
        style: component?.style,
        props: component?.props,
        type: ComponentType[component?.type],
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
      id: section?.id ?? '',
    }));
    this.animation = {
      duration: dto?.animation?.duration ?? '',
      timing: dto?.animation?.timing ?? '',
      delay: dto?.animation?.delay ?? '',
      iteration: dto?.animation?.iteration ?? '',
      type: dto?.animation?.type ?? '',
    };
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
