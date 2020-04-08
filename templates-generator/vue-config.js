module.exports = {
    sourcePath: 'packages/devextreme-cli/testing/sandbox/vue/my-app/',
    targetPath: 'packages/devextreme-cli/templates/vue/',
    sourceGlob: '**/*.{js,scss,json,vue}',
    ignoreList: [
        '{node_modules,public,src/themes/generated}/**/*.*',
        'src/{App.test,setupTests,serviceWorker,index}.js',
        'src/components/HelloWorld.vue',
        '{package,package-lock}.json',
        'babel.config.js'
    ],
    replaceRules: [
        {
            glob: 'src/themes/metadata.additional.json',
            definitions: [
                {
                    before: /"baseTheme": "[^"]*"/,
                    after: '"baseTheme": "material.orange.dark"'
                }
            ]
        },
        {
            glob: 'src/themes/metadata.base.json',
            definitions: [
                {
                    before: /"baseTheme": "[^"]*"/,
                    after: '"baseTheme": "material.orange.light"'
                }
            ]
        },
        {
            glob: 'src/themes/metadata.*.json',
            definitions: [
                {
                    before: /"items": \[[^\]]*]/,
                    after: '"items": []'
                }
            ]
        },
        {
            glob: 'src/app-info.js',
            definitions: [
                {
                    before: 'My App',
                    after: '<%=project%>'
                }
            ],
        },
        {
            glob: 'src/app-navigation.js',
            definitions: [
                {
                    before: /\[(.*?)\];/s,
                    after: '[<%=^empty%>$1<%=/empty%>];'
                }
            ]
        },
        {
            glob: 'src/router.js',
            definitions: [
                {
                    before: /(import Home .*?)(import defaultLayout[^;]*)/s,
                    after: '<%=^empty%>$1<%=/empty%>$2'
                },
                {
                    before: 'side-nav-inner-toolbar',
                    after: '<%=layout%>'
                },
                {
                    before: 'side-nav-outer-toolbar',
                    after: '<%=layout%>'
                },
                {
                    before: /(,)(\s+{\s+path: "\/".*redirect: "\/home"[^}]*})/s,
                    after: '$1<%=^empty%>$2<%=/empty%>'
                },
                {
                    before: /\[\s+/,
                        after: `[
<%=#empty%>{
      path: "*",
      redirect: "/"
    },<%=/empty%>
    `
            },
                {
                    before: /\[[^{*]/,
                    after: `[<%=#empty%>
    {
      path: "/",
      components: {
        layout: defaultLayout
      }
    },<%=/empty%>
    `
                },
                {
                    before: /({\s+path: "\/home".*content: DisplayData\s+}\s+},)/s,
                    after: '<%=^empty%>$1<%=/empty%>'
                }
            ]
        }
    ],
    removeRules: [
        {
            glob: 'src/main.js',
            definitions: [
                'import \'devextreme/dist/css/dx.common.css\';\n',
                'import \'./themes/generated/theme.base.css\';\n',
                'import \'./themes/generated/theme.additional.css\';\n',
            ]
        }
    ],
    moveRules: [
        {
            glob: 'src/{!(views)/*.*,views/login-form.vue,*.*}',
            definition:
            {
                sourcePath: '',
                targetPath: 'packages/devextreme-cli/templates/vue/application/'
            }
        },
        {
            glob: 'devextreme.json',
            definition:
            {
                sourcePath: '',
                targetPath: 'packages/devextreme-cli/templates/vue/application/'
            }
        },
        {
            glob: 'src/views/**/*.*',
            definition:
            {
                sourcePath: 'src/views/',
                targetPath: 'packages/devextreme-cli/templates/vue/sample-pages/'
            }
        }
    ]
};
