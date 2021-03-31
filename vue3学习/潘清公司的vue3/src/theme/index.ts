import {
    // ElAlert,
    // ElAside,
    // ElAutocomplete,
    // ElAvatar,
    // ElBacktop,
    ElBadge,
    //ElBreadcrumb,
    //ElBreadcrumbItem,
    ElButton,
    // ElButtonGroup,
    // ElCalendar,
    ElCard,
    ElCalendar,
    // ElCard,
    // ElCarousel,
    // ElCarouselItem,
    // ElCascader,
    // ElCascaderPanel,
    ElCheckbox,
    ElCheckboxButton,
    ElCheckboxGroup,
    ElCol,
    ElCollapse,
    ElCollapseItem,
    // ElCollapseTransition,
    //ElColorPicker,
    // ElContainer,
    ElDatePicker,
    ElTimePicker,
    // ElDialog,
    ElDivider,
    // ElDrawer,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    // ElFooter,
    ElForm,
    ElFormItem,
    // ElHeader,
    // ElIcon,
    ElImage,
    ElInput,
    ElInputNumber,
    ElLink,
    // ElMain,
    ElMenu,
    ElMenuItem,
    // ElMenuItemGroup,
    ElOption,
    ElOptionGroup,
    // ElPageHeader,
    ElPagination,
    // ElPopconfirm,
    // ElPopover,
    ElPopper,
    // ElProgress,
    ElRadio,
    ElRadioButton,
    ElRadioGroup,
    // ElRate,
    ElRow,
    ElScrollbar,
    ElSelect,
    // ElSlider,
    // ElStep,
    // ElSteps,
    ElSubmenu,
    ElSwitch,
    ElTabs,
    ElTabPane,
    ElTable,
    ElTableColumn,
    // ElTimeline,
    // ElTimelineItem,
    // ElTooltip,
    // ElTransfer,
    ElTree,
    ElUpload,
    // ElInfiniteScroll,
    //ElLoading,
    ElMessage,
    ElTag
    // ElMessageBox,
    // ElNotification,
} from 'element-plus';
import './theme.scss';
import lang from 'element-plus/lib/locale/lang/zh-cn';
import locale from 'element-plus/lib/locale';
import 'dayjs/locale/zh-cn';
// 设置语言
locale.use(lang);
export default app => {
    app.config.globalProperties.$ELEMENT = { size: 'small' };
    app.config.globalProperties.$message = ElMessage;
    // app.component(ElAlert.name, ElAlert);
    //app.component(ElAside.name, ElAside);
    // app.component(ElAutocomplete.name, ElAutocomplete);
    // app.component(ElAvatar.name, ElAvatar);
    // app.component(ElBacktop.name, ElBacktop);
    app.component(ElBadge.name, ElBadge);
    //app.component(ElBreadcrumb.name, ElBreadcrumb);
    //app.component(ElBreadcrumbItem.name, ElBreadcrumbItem);
    app.component(ElButton.name, ElButton);
    // app.component(ElButtonGroup.name, ElButtonGroup);
    // app.component(ElCalendar.name, ElCalendar);
    app.component(ElCard.name, ElCard);
    app.component(ElCalendar.name, ElCalendar);
    // app.component(ElCard.name, ElCard);
    // app.component(ElCarousel.name, ElCarousel);
    // app.component(ElCarouselItem.name, ElCarouselItem);
    // app.component(ElCascader.name, ElCascader);
    // app.component(ElCascaderPanel.name, ElCascaderPanel);
    app.component(ElCheckbox.name, ElCheckbox);
    app.component(ElCheckboxButton.name, ElCheckboxButton);
    app.component(ElCheckboxGroup.name, ElCheckboxGroup);
    app.component(ElCol.name, ElCol);
    app.component(ElCollapse.name, ElCollapse);
    app.component(ElCollapseItem.name, ElCollapseItem);
    // app.component(ElCollapseTransition.name, ElCollapseTransition);
    // app.component(ElColorPicker.name, ElColorPicker);
    // app.component(ElContainer.name, ElContainer);
    app.component(ElDatePicker.name, ElDatePicker);
    app.component(ElTimePicker.name, ElTimePicker);

    // app.component(ElDialog.name, ElDialog);
    app.component(ElDivider.name, ElDivider);
    // app.component(ElDrawer.name, ElDrawer);
    app.component(ElDropdown.name, ElDropdown);
    app.component(ElDropdownItem.name, ElDropdownItem);
    app.component(ElDropdownMenu.name, ElDropdownMenu);
    // app.component(ElFooter.name, ElFooter);
    app.component(ElForm.name, ElForm);
    app.component(ElFormItem.name, ElFormItem);
    // app.component(ElHeader.name, ElHeader);
    // app.component(ElIcon.name, ElIcon);
    app.component(ElImage.name, ElImage);
    app.component(ElInput.name, ElInput);
    app.component(ElInputNumber.name, ElInputNumber);
    app.component(ElLink.name, ElLink);
    // app.component(ElMain.name, ElMain);
    app.component(ElMenu.name, ElMenu);
    app.component(ElMenuItem.name, ElMenuItem);
    // app.component(ElMenuItemGroup.name, ElMenuItemGroup);
    app.component(ElOption.name, ElOption);
    app.component(ElOptionGroup.name, ElOptionGroup);
    // app.component(ElPageHeader.name, ElPageHeader);
    app.component(ElPagination.name, ElPagination);
    // app.component(ElPopconfirm.name, ElPopconfirm);
    // app.component(ElPopover.name, ElPopover);
    app.component(ElPopper.name, ElPopper);
    // app.component(ElProgress.name, ElProgress);
    app.component(ElRadio.name, ElRadio);
    app.component(ElRadioButton.name, ElRadioButton);
    app.component(ElRadioGroup.name, ElRadioGroup);
    // app.component(ElRate.name, ElRate);
    app.component(ElRow.name, ElRow);
    app.component(ElScrollbar.name, ElScrollbar);
    app.component(ElSelect.name, ElSelect);
    // app.component(ElSlider.name, ElSlider);
    // app.component(ElStep.name, ElStep);
    // app.component(ElSteps.name, ElSteps);
    app.component(ElSubmenu.name, ElSubmenu);
    app.component(ElSwitch.name, ElSwitch);
    app.component(ElTabs.name, ElTabs);
    app.component(ElTabPane.name, ElTabPane);
    app.component(ElTag.name, ElTag);
    app.component(ElTable.name, ElTable);
    app.component(ElTableColumn.name, ElTableColumn);
    // app.component(ElTimeline.name, ElTimeline);
    // app.component(ElTimelineItem.name, ElTimelineItem);
    // app.component(ElTooltip.name, ElTooltip);
    // app.component(ElTransfer.name, ElTransfer);
    app.component(ElTree.name, ElTree);
    app.component(ElUpload.name, ElUpload);
    // app.component(ElInfiniteScroll.name, ElInfiniteScroll);
    //app.component(ElLoading.name, ElLoading);
    // app.component(ElMessage.name, ElMessage);
    // app.component(ElMessageBox.name, ElMessageBox);
    // app.component(ElNotification.name, ElNotification)
};

