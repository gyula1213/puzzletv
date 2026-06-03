/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React, { CSSProperties, FC, ReactNode } from "react";
import { headerHeight, headerPadding, lightGreyColor, textColor } from "../../app/globals";
import { translate } from "../../../utils/translate";
import { Title } from "../title/Title";
import { observer } from "mobx-react-lite";
import { profiler } from "../../../utils/profiler";
import { LanguageSelector } from "../language-selector/LanguageSelector";
import { LanguageCode } from "../../../types/translations/LanguageCode";

export interface PageLayoutProps {
    addPadding?: boolean;
    scrollable: boolean;
    title?: ReactNode;
    hideTitleHeader?: boolean;
    addTitleSuffix?: boolean;
    textAlign?: CSSProperties["textAlign"];
    children: ReactNode;
}

const logeszHomeUrl = "https://logesz.hu/";
const logeszPuzzlesUrl = "/puzzles/";

export const PageLayout = observer(function PageLayout({
    addPadding = true,
    scrollable,
    title,
    hideTitleHeader,
    addTitleSuffix = true,
    textAlign,
    children,
}: PageLayoutProps) {
    profiler.trace();

    const goBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = logeszPuzzlesUrl;
        }
    };

    return (
        <StyledPageContainer textAlign={textAlign}>
            {title && (
                <Title>
                    {title}
                    {addTitleSuffix && " – Puzzle TV"}
                </Title>
            )}

            <StyledHeaderContainer>
                <StyledHorizontalFlex style={{ width: "100%" }}>
                    <StyledHorizontalFlex style={{ flex: "1 0 0" }}>
                        <button
                            type={"button"}
                            onClick={goBack}
                            css={headerButtonStyle}
                            title={translate({
                                [LanguageCode.en]: "Go back",
                                [LanguageCode.ru]: "Назад",
                                [LanguageCode.de]: "Zurück",
                            })}
                        >
                            ←{" "}
                            {translate({
                                [LanguageCode.en]: "Back",
                                [LanguageCode.ru]: "Назад",
                                [LanguageCode.de]: "Zurück",
                            })}
                        </button>

                        <a
                            href={logeszPuzzlesUrl}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                color: "inherit",
                                textDecoration: "none",
                                fontSize: headerHeight * 0.6,
                            }}
                            title={translate({
                                [LanguageCode.en]: "Go to the LOGESZ puzzles page",
                                [LanguageCode.ru]: "Перейти на страницу головоломок LOGESZ",
                                [LanguageCode.de]: "Zur LOGESZ-Rätselseite",
                            })}
                        >
                            <span>Puzzle</span>
                            <svg
                                style={{ width: headerHeight * 1.2, height: headerHeight, marginLeft: "0.2em" }}
                                viewBox={"0 0 30 25"}
                            >
                                <rect x={2} y={5} width={26} height={15} fill={textColor} stroke={textColor} />
                                <line x1={8} y1={5} x2={5} y2={1} stroke={textColor} />
                                <line x1={22} y1={5} x2={25} y2={1} stroke={textColor} />
                                <line x1={4} y1={8} x2={14} y2={8} stroke={"#fff"} />
                                <line x1={9} y1={8} x2={9} y2={18} stroke={"#fff"} />
                                <line x1={16} y1={7.5} x2={21} y2={18} stroke={"#fff"} />
                                <line x1={26} y1={7.5} x2={21} y2={18} stroke={"#fff"} />
                            </svg>
                        </a>

                        <a
                            href={logeszHomeUrl}
                            css={headerButtonStyle}
                            title={translate({
                                [LanguageCode.en]: "Go to the LOGESZ home page",
                                [LanguageCode.ru]: "Перейти на главную страницу LOGESZ",
                                [LanguageCode.de]: "Zur LOGESZ-Startseite",
                            })}
                        >
                            LOGESZ
                        </a>
                    </StyledHorizontalFlex>

                    <div>
                        <LanguageSelector />
                    </div>
                </StyledHorizontalFlex>
            </StyledHeaderContainer>

            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: headerHeight,
                    right: 0,
                    bottom: 0,
                    padding: addPadding ? headerPadding : 0,
                    overflow: scrollable ? "auto" : "hidden",
                }}
            >
                {!hideTitleHeader && title && <PageTitle>{title}</PageTitle>}

                {children}
            </div>
        </StyledPageContainer>
    );
});

export const PageTitle: FC = observer(function PageTitle({ children }) {
    profiler.trace();

    return <h1 style={{ marginTop: 0 }}>{children}</h1>;
});

const headerButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: headerHeight * 0.62,
    padding: `0 ${Math.round(headerPadding * 0.55)}px`,
    border: `1px solid ${textColor}`,
    borderRadius: headerHeight,
    background: "transparent",
    color: "inherit",
    font: "inherit",
    fontSize: headerHeight * 0.32,
    lineHeight: "1em",
    textDecoration: "none",
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
};

const StyledPageContainer = styled("div")<{ textAlign?: CSSProperties["textAlign"] }>`
    position: absolute;
    inset: 0;
    overflow: hidden;
    color: ${textColor};
    font-family: Lato, sans-serif;
    text-align: ${({ textAlign }) => textAlign};
`;

const StyledHeaderContainer = styled("div")({
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    height: headerHeight,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: lightGreyColor,
    fontSize: headerHeight * 0.5,
    lineHeight: "1em",
    padding: `0 ${headerPadding}px`,
});

const StyledHorizontalFlex = styled("div")({
    display: "flex",
    alignItems: "center",
    columnGap: "0.5em",
});
