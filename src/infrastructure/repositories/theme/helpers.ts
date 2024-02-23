import {
  ButtonSize,
  ButtonType,
  ComponentType,
  FooterLayout,
  NavigationLayout,
  Prisma,
  TypographySize,
} from '@prisma/client';
import { ThemeConfig } from '../../../domain/theme/theme-config';

export const themeConfigMapper = (
  dto: ThemeConfig,
): Prisma.ThemeConfigCreateInput => ({
  title: dto.title,
  cards: {
    borderRadius: dto?.cards?.borderRadius ?? '',
    backgroundColor: dto?.cards?.backgroundColor ?? '',
  },
  colorPallete: dto.colorPallete,
  typography: {
    fontSize: TypographySize[dto.typography.fontSize],
    headers: dto.typography.headers,
    text: dto.typography.text,
  },
  background: dto.background,
  animation: dto.animation,
  sections: dto.sections.map((section) => ({
    title: section.title,
    description: section.description,
    style: section.style,
    props: section.props,
    components: section.components.map((component) => ({
      title: component.title,
      style: component.style,
      props: component.props,
      type: ComponentType[component.type],
    })),
    createdAt: new Date(),
    updatedAt: new Date(),
    id: section.id,
  })),
  footer: {
    layout: FooterLayout[dto.footer.layout],
    backgroundColor: dto.footer.backgroundColor,
    fontSize: dto.footer.fontSize,
    fontWeight: dto.footer.fontWeight,
    color: dto.footer.color,
  },
  logo: dto.logo,
  navigation: {
    layout: NavigationLayout[dto.navigation.layout],
    backgroundColor: dto.navigation.backgroundColor,
    fontSize: dto.navigation.fontSize,
    fontWeight: dto.navigation.fontWeight,
    navigationLinksColors: dto.navigation.navigationLinksColors,
  },
  buttons: {
    borderRadius: dto?.buttons?.borderRadius ?? '',
    buttonHover: dto?.buttons?.buttonHover ?? true,
    buttonSize: ButtonSize[dto?.buttons?.buttonSize] ?? ButtonSize.MEDIUM,
    buttonType: ButtonType[dto?.buttons?.buttonType] ?? ButtonType.FILLED,
  },
  createdAt: new Date(),
  updatedAt: new Date(),
});
